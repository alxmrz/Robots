define(['../src/SceneObject'], function(SceneObject){
  class Wall extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 25;
      this.height = 25;
      this.fillStyle = 'brown'
      this.name = 'Стена';
    }

    showYourself() {
      this.setBlueColorIfObjectChosen();
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
    }

    setBlueColorIfObjectChosen() {
      if(this.chosen) {
        this.ctx.fillStyle = 'yellow';
      } else {
        this.ctx.fillStyle = this.fillStyle;
      }
    }

  }
  return Wall;
});
