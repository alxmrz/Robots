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
      this.showThatChosen();
      this.printBody();
    }
    
    showThatChosen() {
      if(this.chosen) {
        this.ctx.strokeStyle = 'lime';
        this.ctx.lineWidth=8;
        this.ctx.strokeRect(this.point.getX(), this.point.getY(), this.width, this.height);
      }
      
    }
    printBody() {
      throw new Error("Call of abstract method showThatChosen");
    }
  }
  
  return SceneObject;
});


