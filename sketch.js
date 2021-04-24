const crystal_radius = 400;
const number_of_crystals = 10;
const sides = 6;
// //grid
const margin = crystal_radius / 2;
const columns = 1;
const rows = 1;
const padding = crystal_radius * 0.2;
const gridbox = crystal_radius + padding;
const start = crystal_radius / 2 + margin;
let palette = [];
crystation = [];
let next_button;
let n = 0;

function setup() {
  const totalX = start + gridbox * columns;
  const totalY = start + gridbox * rows;
  createCanvas(totalX, totalY);
  next_button = createButton("Next");

  palette = [
    color("#FF7773"),
    color("#52D1AD"),
    color("#3F888F"),
    color("#497358"),
  ];

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  for (let i = 0; i < number_of_crystals; i++) {
    const posX = width / 2;
    const posY = height / 2;
    crystation.push(new Crystal(posX, posY));
  }
  next_button.mousePressed(render_next);
  crystation[n].render();
}

function render_next() {
  n += 1;
}

function grid_display() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const posX = start + x * gridbox;
      const posY = start + y * gridbox;
      crystation.push(new Crystal(posX, posY));
    }
  }
}
