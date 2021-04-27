//General Mandal Params
const crystal_radius = 300;
const number_of_crystals = 1;
const sides = 6;
// canvas size
const margin = crystal_radius / 2;
const canvasSize = crystal_radius + margin;

//Arrays
let palette = [];
let crystation = [];
let origin_x;
let origin_y;
//Input parameters
let input_params = {};

function setup() {
  createCanvas(canvasSize, canvasSize);
  origin_x = width / 2;
  origin_y = height / 2;
  background(200);
  palette = [
    color("#FF7773"),
    color("#52D1AD"),
    color("#3F888F"),
    color("#497358"),
  ];

  input_params = {
    external_shape: {
      ID: "External Shape",
      shape: "circle",
      color: "",
      scale: 1,
      thickness: "",
    },
  };

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  //Fill crystall array with different crystals
  for (let i = 0; i < number_of_crystals; i++) {
    crystation.push(new Crystal(origin_x, origin_y, input_params));
  }

  crystation[0].render(); // render a single crystal for now.
}
