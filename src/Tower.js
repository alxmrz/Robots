define(['../src/SceneObject'], function(SceneObject){
  class Tower extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 25;
      this.height = 25;
      this.fillStyle = '#8A2BE2'
      this.name = 'Башня';
    }

    printBody() {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.beginPath();
      let x = this.point.getX();
      let y = this.point.getY();
      this.ctx.moveTo(x + this.width*(1/3), y);
      this.ctx.lineTo(x + this.width*(1/3), y);
      this.ctx.lineTo(x + this.width*(2/3), y);
      this.ctx.lineTo(x + this.width, y + this.height*(1/3));
      this.ctx.lineTo(x + this.width, y + this.height*(2/3));
      this.ctx.lineTo(x + this.width*(2/3), y + this.height);
      this.ctx.lineTo(x + this.width*(1/3), y + this.height);
      this.ctx.lineTo(x, y + this.height*(2/3));
      this.ctx.lineTo(x, y + this.height*(1/3));
      this.ctx.moveTo(x + this.width*(1/3), y);
      this.ctx.fill();
    } 

  }
  return Tower;
});