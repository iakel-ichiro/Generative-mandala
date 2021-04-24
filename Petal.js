function setup() {
  createCanvas(1000, 1000);
  const w = width / 2;
  const h = height / 2;
  // ellipse(width / 2, height / 2, 100);
  // beginShape();
  // vertex(30, 20);

  // endShape();

  arc(w, h, 500, 800, 0, HALF_PI);
  arc(w, h, 500, 800, PI, -HALF_PI);
}

function draw() {}
