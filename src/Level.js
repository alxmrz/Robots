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
      this.buildWalls(builders[0]);
      this.buildFactories(builders[1]);
      


    }
    buildWalls(builder) {
      builder.speed = 5;

      for(let x=0;x<this.scene.canvas.clientWidth-25;x+=25) {
        if(x%400 === 0) {
          builder.buildTower();
        } else {
          builder.buildWall();
        }
        
        builder.moveRight(25);
      }

      for(let y=0;y<this.scene.canvas.clientHeight-25;y+=25) {
        
        if(y%400 === 0) {
          
          builder.buildTower();
        } else {
          
          builder.buildWall();
        }

        builder.moveDown(25);
      }
   
      for(let x=this.scene.canvas.clientWidth-25;x>0;x-=25) {
        console.log(`${this.scene.canvas.clientWidth} ${x}`)
        if(x%400 === 0 ||x === this.scene.canvas.clientWidth-25) {
          builder.buildTower();
        } else {
          builder.buildWall();
        }
        builder.moveLeft(25);
      }
      
      for(let y=this.scene.canvas.clientHeight-25;y>25;y-=25) {
        if(y%400 === 0 || y === 600) {
          
          builder.buildTower();
        } else {
          
          builder.buildWall();
        }

        builder.moveUp(25);
      }
      builder.buildWall();
      builder.moveRight(50);
    }
    
    buildFactories(builder) {
      builder.speed = 5;
      builder.moveRight(100);
      
      this.buildFactoriesBlock(builder);
      
      builder.moveLeft(100);
      builder.moveDown(250);
      this.buildFactoriesBlock(builder);
      builder.moveRight(600);
      builder.moveUp(100);
      this.buildFactoriesBlock(builder);
      builder.moveLeft(100);
      builder.moveUp(450);
      this.buildFactoriesBlock(builder);
      
      
    }
    buildFactoriesBlock(builder) {
      builder.buildWall();
      builder.moveRight(50);
      builder.buildWall();
      builder.moveRight(50);
      builder.buildWall();
      
      builder.moveDown(50);//TODO: первый раз почему то не срабатывает!
 
      
      builder.buildWall();
      builder.moveLeft(50);
      builder.buildWall();
      builder.moveLeft(50);
      builder.buildWall();
      
      builder.moveDown(50);
      
      builder.buildWall();
      builder.moveRight(50);
      builder.buildWall();
      builder.moveRight(50);
      builder.buildWall();
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
            let localCoords = builder.getPoint();
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