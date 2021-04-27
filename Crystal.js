class Crystal {
  constructor(posX, posY, input_params_) {
    this.x = posX;
    this.y = posY;
    this.layers = [];
    this.input_params = input_params_;

    layerConstructors.forEach((layercon, index) => {
      let param = this.input_params[Object.keys(this.input_params)[index]];

      let picker = random(1);
      if (param || picker > layercon.prob) {
        this.layers.push(layercon.init(param, param));
      }
    });
    console.log(this.layers);
  }

  render(external_shape) {
    push();
    translate(this.x, this.y);
    this.layers.forEach((layer) => {
      layer.render();
    });

    pop();
  }
}
