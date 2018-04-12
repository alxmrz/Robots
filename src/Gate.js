define(['../src/SceneObject'], function(SceneObject){
  class Gate extends SceneObject {
    constructor(point, type='horizontal') {
      super(point)
      if(type === 'horizontal') {
        this.width = 75;
        this.height = 25;
      } else {
        this.width = 25;
        this.height = 75;
      }
      
      this.type= type;
      this.fillStyle = '#8A2BE2'
      this.name = 'Gate';
    }

  }
  return Gate;
});