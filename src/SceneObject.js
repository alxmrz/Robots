define(function(){
  class SceneObject {
    constructor(point) {
      if (this.constructor === SceneObject) {
        throw new Error("Can't instantiate abstract class!");
      }
      this.point = point;
      this.canBeChosen = true;
      this.chosen = false;
      this.width;
      this.height;
      this.name = 'SceneObject';
    }
    
    setCoords(point) {
      this.point = point;
    }
    getPoint() {
      return this.point;
    }
   
    
    
    printBody() {
      throw new Error("Call of abstract method showThatChosen");
    }
    
    getName() {
      return this.name;
    }
  }
  
  return SceneObject;
});


