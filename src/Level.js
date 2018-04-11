define(['../src/Scene', '../src/ObjectFactory', '../src/Builder'], function(Scene, ObjectFactory, Builder){
  class Level {
    constructor(scene, factory) {
      if(!(scene instanceof Scene)) {
        throw new Error('Scene is not provided!');
      }
      this.scene = scene;
      this.factory = factory;
    }
    
    init() {
      this.addBuilderToScene(0, 0);
      this.addBuilderToScene(25, 75);
      this.addBuilderToScene(25, 125);
      
      let builders = this.getBuilders();
      this.setLevelInstructions(builders);

    }
    
    setLevelInstructions(builders) {
      builders[0].speed = 5;

      for(let x=0;x<this.scene.canvas.clientWidth-25;x+=50) {
        builders[0].buildWall();
        builders[0].moveRight(50);
      }

      for(let y=0;y<this.scene.canvas.clientHeight;y+=50) {
        builders[0].buildWall();
        builders[0].moveDown(50);
      }
   
      for(let x=this.scene.canvas.clientWidth-25;x>0;x-=50) {
        builders[0].buildWall();
        builders[0].moveLeft(50);
      }
      
      for(let y=this.scene.canvas.clientHeight-25;y>50;y-=50) {
        builders[0].buildWall();
        builders[0].moveUp(50);
      }
      builders[0].buildWall();
      builders[0].moveRight(50);
      
      builders[1].moveRight(100);
      
      builders[1].buildWall();
      builders[1].moveRight(50);
      builders[1].buildWall();
      builders[1].moveRight(50);
      builders[1].buildWall();
      
      builders[1].moveDown(50);
      builders[1].moveDown(50);
      
      builders[1].buildWall();
      builders[1].moveLeft(50);
      builders[1].buildWall();
      builders[1].moveLeft(50);
      builders[1].buildWall();
      
      builders[1].moveDown(50);
      
      builders[1].buildWall();
      builders[1].moveRight(50);
      builders[1].buildWall();
      builders[1].moveRight(50);
      builders[1].buildWall();
      builders[1].moveRight(50);

    }
    
    addBuilderToScene( x, y ) {
      this.scene.sceneObjects['builders'].push(this.factory.getBuilder( x, y, this.scene ));
      
    }
    
    playLevelScenario(eventRegister) {
      let builders = this.getBuilders();
      
      builders[0].runInstructions();
      builders[1].runInstructions();
      
      //Следующий код должен быть в "Движке"
      for(let builder of builders) {
            let localCoords = builder.getCoords();
            this.scene.selectObjectIfClicked(eventRegister.clickCoords, localCoords, builder);
            if(builder.chosen && eventRegister.rightClickCoords !== undefined) {
              this.scene.setNewCoordsToSelectedObject(eventRegister.rightClickCoords, builder);
            }

            this.scene.moveSelectedObjectToSpecialCoords(eventRegister.rightClickCoords, builder);
        builder.showYourself();
      }
      
      
    }
    
    getBuilders() {
      return this.scene.sceneObjects['builders'];
    }
    
    
  }
  
  return Level;
});