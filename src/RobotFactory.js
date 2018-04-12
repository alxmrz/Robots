define(['../src/SceneObject'], function(SceneObject){
  class Tower extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 50;
      this.height = 50;
      this.fillStyle = '#00008B'
      this.name = 'Фабрика роботов';
    }

    printBody() {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
    } 

  }
  return Tower;
});