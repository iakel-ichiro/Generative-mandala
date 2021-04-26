class Layer {
  constructor(param_) {
    this.sides = sides;
    this.numShapes = this.sides;
    this.angle = 360 / this.numShapes;
    this.stepLevels = 8;
    this.singleStep = crystal_radius / 2 / this.stepLevels;
    this.levelRatio = 1.25;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.layerColor = getRandomFromPalette();
    this.param = param_;
  }
}

class Circles extends Layer {
  constructor(param_) {
    super(); // whatever you extend from.... get it here
    this.shapeSize = (crystal_radius / 2) * random(1); //0.93 is nice!
    this.centerPos = crystal_radius / 2 - this.shapeSize / 2;
    this.weight = this.thinStroke;
    this.color = getRandomFromPalette();
    this.num = this.numShapes;
    this.angle_circ = 360 / this.num;
  }
  render() {
    noFill();
    stroke(this.color);
    strokeWeight(this.weight);
    push();
    //translate(width/2, height/2)
    for (let i = 0; i < this.num; i++) {
      ellipse(this.centerPos, 0, this.shapeSize, this.shapeSize);
      rotate(this.angle_circ);
    }
    pop();
  }
}

class SteppedLines extends Layer {
  constructor(param_) {
    super();
    this.numSteps = randomSelectTwo()
      ? this.stepLevels
      : int(this.stepLevels * this.levelRatio);
    this.step = crystal_radius / 2 / this.numSteps;
    this.start = floor(random(0, this.numSteps));
    this.stop = floor(random(this.start, this.numSteps + 1));
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
  }

  render() {
    noFill();
    stroke(this.layerColor);
    strokeWeight(this.weight);
    push();
    //translate(width/ 2, height / 2)
    for (let k = 0; k < this.numShapes; k++) {
      line(this.start * this.step, 0, this.stop * this.step, 0); //crystal_radius/2 makes cool spiral lines
      rotate(this.angle);
    }
    pop();
  }
}

class ExternalShape extends Layer {
  constructor({ shape, color, scale, thickness }) {
    super();
    this.shape = shape || randomSelectTwo();
    this.weight =
      thickness || (randomSelectTwo() ? this.thinStroke : this.thickStroke);
    this.color = color || getRandomFromPalette();
    this.radius = scale * crystal_radius || crystal_radius;
  }

  render() {
    noFill();

    strokeWeight(this.weight);
    stroke(this.color);
    push();
    if (!this.shape || this.shape === "circle") {
      ellipse(0, 0, this.radius, this.radius);
    } else {
      polygon(0, 0, this.radius / 2, 6);
    }
    pop();
  }
}

class DottedLines extends Layer {
  constructor(param_) {
    super();
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
    this.shapeSize = 3;
    this.centerOffset = this.singleStep;
  }

  render() {
    fill(this.layerColor);
    noStroke();
    push();
    //translate(width/2, height/2)
    for (let i = 0; i < this.numShapes; i++) {
      for (
        let x = this.centerOffset;
        x < crystal_radius / 2;
        x += this.singleStep
      ) {
        rect(x, 0, this.shapeSize, this.shapeSize);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class CenteredShape extends Layer {
  constructor(param_) {
    super();
    this.randomShape = random(1);
    this.shapeSize =
      floor(random(this.stepLevels / 2, this.stepLevels)) * this.singleStep;
  }

  render() {
    fill(this.layerColor);
    noStroke();
    push();
    //translate(width/2, height/2)
    if (this.randomShape < 0.1) {
      rect(0, 0, this.shapeSize, this.shapeSize);
    } else if (this.randomShape >= 0.1 && this.randomShape < 0.6) {
      ellipse(0, 0, this.shapeSize, this.shapeSize);
    } else if (this.randomShape >= 0.6) {
      rotate(this.angle / 2);
      polygon(0, 0, this.shapeSize / 2, 6);
    }
    pop();
  }
}

class RingOfShapes extends Layer {
  constructor(param_) {
    super();
    this.steps = floor(random(1, this.stepLevels));
    this.center = this.steps * this.singleStep;
    this.randomShape = random(1);
    this.direction = randomSelectTwo(); // used for triangle only
    this.fillColor = randomSelectTwo() ? this.layerColor : color(0, 1);
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;

    if (this.steps < this.stepLevels / 2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep;
    } else if (this.steps > this.stepLevels / 2) {
      this.radius =
        floor(random(1, this.stepLevels - this.steps)) * this.singleStep;
    } else {
      this.radius = floor(random(1, this.stepLevels / 2 + 1)) * this.singleStep;
    }
  }

  render() {
    stroke(this.layerColor);
    fill(this.fillColor);
    strokeWeight(this.weight);
    push();
    // translate(width / 2, height / 2)
    for (let i = 0; i < this.numShapes; i++) {
      if (this.randomShape < 0.33) {
        ellipse(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
        rect(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.66) {
        myTriangle(this.center, this.radius, this.direction);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class SteppedHexagons extends Layer {
  constructor(param_) {
    super();
    this.numSteps = randomSelectTwo()
      ? this.stepLevels
      : this.stepLevels * 1.25;
    this.centerOffset = (crystal_radius / 2) * 0.15;
    this.singleStep = (crystal_radius / 2 - this.centerOffset) / this.numSteps;
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.poly = random([3, 6, 7, 8, 9]);
  }

  render() {
    stroke(this.layerColor);
    noFill();
    strokeWeight(this.weight);
    push();
    // translate(width / 2, height / 2)
    rotate(this.angle / 2);
    for (let i = 1; i < this.numSteps + 1; i++) {
      polygon(0, 0, this.centerOffset + i * this.singleStep, this.poly);
    }
    pop();
  }
}
