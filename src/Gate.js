define(['../src/SceneObject'], function(SceneObject){
  class Gate extends SceneObject {
    constructor(point, scene, type='horizontal') {
      super(point, scene)
      if(type === 'horizontal') {
        this.width = 75;
        this.height = 25;
      } else {
        this.width = 25;
        this.height = 75;
      }
      
      this.type= type;
      this.fillStyle = '#8A2BE2'
      this.name = 'Башня';
    }

    printBody() {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
    } 

  }
  return Gate;
});