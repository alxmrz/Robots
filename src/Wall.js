define(['../src/SceneObject'], function(SceneObject){
  class Wall extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 25;
      this.height = 25;
      this.fillStyle = 'brown'
      this.name = 'Стена';
    }

    printBody() {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
    }

  }
  return Wall;
});
