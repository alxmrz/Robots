define(['../src/Scene', '../src/EventRegister'], function(Scene, EventRegister){
  return class Application{
      constructor(scene) {
        if(!(scene instanceof Scene)) {
          throw new Error('Scene is not provided!');
        }
        this.scene = scene;
      }

      main() {
        this.eventRegister = new EventRegister();
        this.eventRegister.registerAllEvents();

        this.scene.init();
        this.game();
      }

      game() {
        this.scene.show(this.eventRegister);
        this.eventRegister.resetMouseEventsCoords();
        window.requestAnimationFrame(this.game.bind(this));
      }

      getScene() {
        return this.scene;
      }
  }

})
