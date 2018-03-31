define(['../src/Scene'], function(Scene){
  return class Application{
      constructor(scene) {
        if(!(scene instanceof Scene)) {
          throw new Error('Scene is not provided!');
        }
        this.scene = scene;
      }

      main() {
        this.scene.show();
      }

      getScene() {
        return this.scene;
      }
  }

})
