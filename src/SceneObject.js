define(function(){
  class SceneObject {
    constructor(point, scene) {
      if (this.constructor === SceneObject) {
        throw new Error("Can't instantiate abstract class!");
      }
      this.point = point;
      this.canBeChosen = true;
      this.chosen = false;
      this.width;
      this.height;
      this.scene = scene;
      this.ctx = this.scene.ctx;
      this.name = 'SceneObject';
    }
    
    setCoords(point) {
      this.point = point;
    }
    getPoint() {
      return this.point;
    }
    
    showYourself() {
      throw new Error("Call of abstract method showYourself");
    }
    
    showThatChosen() {
      throw new Error("Call of abstract method showThatChosen");
    }
  }
  
  return SceneObject;
});


