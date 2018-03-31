define(['../src/Scene'], function(Scene){
  return class Application{
      main() {
        let scene = new Scene();

        scene.show();
      }
  }

})
