
function polygon(posX, posY, radius, n) {
    const rotAngle = 360 / n
    beginShape()
      for (let i = 0; i < n; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle)
        vertex(thisVertex.x, thisVertex.y)
      }
    endShape(CLOSE)
  }
  
  function pointOnCircle(posX, posY, radius, angle) {
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
  }
  
  
function randomSelectTwo() {
    const rando = random(1)
    if (rando > 0.5) {
      return true
    } else {
      return false
    } 
  }
  
  function getRandomFromPalette() {
    const rando2 = floor(random(0, palette.length))
    return palette[rando2]
  }

  

function guideLines() {
    let num_shapes = randomSelectTwo() ? sides: sides * 2
    const strokeColor = getRandomFromPalette()
  
    noFill()
    stroke(0)
    push()
      translate(width / 2, height / 2)
      stroke(strokeColor)
      ellipse(0, 0, crystal_radius, crystal_radius)
      stroke(palette[2])
      const angle = 360 / num_shapes
      for (let i = 0 ;i < num_shapes; i++) {
        line(0, 0, 0, crystal_radius / 2)
        rotate(angle)
      }
    pop()
  }
  
  
function myTriangle (center, radius, direction) {
    if (direction) {
      beginShape();
      vertex(center + radius * cos(0), radius * sin(0));
      vertex(center + radius * cos(120), radius * sin(120));
      vertex(center + radius * cos(240), radius * sin(240));
      endShape(CLOSE); 
    } else {
      beginShape();
      vertex(center + radius * cos(180), radius * sin(180));
      vertex(center + radius * cos(300), radius * sin(300));
      vertex(center + radius * cos(60), radius * sin(60));
      endShape(CLOSE);
    }
  }

  
const layerConstructors = [
    {
      name: 'External Shape',
      init: () => new ExternalShape(),
      prob: 0.3
    },
    {
      name: 'Centered Shape',
      init: () => new CenteredShape(),
      prob: 0.3
    },
    {
      name: 'Circles',
      init: () => new Circles(),
      prob: 0.3
    },
    {
      name: 'Stepped Lines',
      init: () => new SteppedLines(),
      prob: 0.3
    },
    {
      name: 'Dotted Lines',
      init: () => new DottedLines(),
      prob: 0.3
    },
    {
      name: 'Ring of Shapes',
      init: () => new RingOfShapes(),
      prob: 0.3
    },
    {
      name: 'Stepped Hexagons',
      init: () => new SteppedHexagons(),
      prob: 0.3
    },
    {
      name: 'Test Lines',
      init: () => new guideLines(),
      prob: 1
    }
  ]
  
