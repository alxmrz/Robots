define(['../src/SceneObject'], function(SceneObject){
  class RobotFactory extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 50;
      this.height = 50;
      this.fillStyle = '#00008B'
      this.name = 'RobotFactory';
    }
  }
  return RobotFactory;
});