define(['../src/Scene', '../src/ObjectFactory'], function(Scene, ObjectFactory){
  class Level {
    constructor(scene, factory) {
      if(!(scene instanceof Scene)) {
        throw new Error('Scene is not provided!');
      }
      this.scene = scene;
      this.factory = factory;
    }
    
    init() {
      this.addBuilderToScene(25, 25);
      this.addBuilderToScene(25, 75);
      this.addBuilderToScene(25, 125);
    }
    
    addBuilderToScene( x, y ) {
      this.scene.sceneObjects['builders'].push(this.factory.getBuilder( x, y, this.scene.ctx ));
      
    }
    
    getBuilders() {
      return this.scene.sceneObjects['builders'];
    }
    
    
  }
  
  return Level;
});