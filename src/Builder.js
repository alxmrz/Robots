define(['../src/SceneObject', '../src/Point', '../src/Wall', '../src/Tower', '../src/RobotFactory', '../src/Gate'], 
function(SceneObject, Point, Wall, Tower, RobotFactory, Gate){
  return class Builder extends SceneObject
  {
    constructor(point, scene ) {
      super( point );

      this.fillStyle = 'black';
      this.orientation = 'UP';
      this.currentSprite = 0;
      this.instructions = [];
      this.seconds;
      this.nextSecond;
      this.offsetX = undefined;
      this.offsetY = undefined;
      this.speed = 1;
      this.scene = scene;
      this.width = 50;
      this.height = 50;
      this.name = 'Builder';
    }


    buildWall() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new Wall(new Point(this.point.getX(), this.point.getY())));
          return true;
        }
      );
    }
    
    buildTower() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new Tower(new Point(this.point.getX(), this.point.getY())));
          return true;
        }
      );
    }
    
    buildGate(gateType) {
      this.addNewInstruction(
        function(gateType){
          this.scene.sceneObjects['builders'].push(new Gate(new Point(this.point.getX(), this.point.getY()), gateType));
          return true;
        },
        gateType   
      );
    }
    
    buildRobotFactory() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new RobotFactory(new Point(this.point.getX(), this.point.getY())));
          return true;
        }
      );
    }
    
    moveRight(offsetX) {
      this.addNewInstruction(
        function(offset){
          let date = new Date();
          this.setOrientation('RIGHT');
          if(this.offsetX === undefined) {
            this.offsetX = this.point.getX() + offsetX;
          }
          
          if(this.point.getX() < this.offsetX) {
            this.point.setX(this.point.getX() + this.speed);
              if(this.seconds !== date.getSeconds()) {
                this.nextSecond = date.getSeconds();
                this.seconds = date.getSeconds();
                if(this.currentSprite <4) {
                this.currentSprite +=1;
              } else {
                this.currentSprite =1;
              }
            } 
            
            
            return false;
          } 

          this.offsetX = undefined;
          return true;
        },
        offsetX
      );
    }
    moveLeft(offsetX) {
      this.addNewInstruction(
        function(offset){
          this.setOrientation('LEFT');
          if(this.offsetX === undefined) {
            
            this.offsetX = this.point.getX() - offset;
            
          }
          
          if(this.point.getX() > this.offsetX) {
            this.point.setX(this.point.getX() - this.speed);
            if(this.currentSprite <4) {
              this.currentSprite +=1;
            } else {
              this.currentSprite =1;
            }
            return false;
          } 
          this.currentSprite =0;
          this.offsetX = undefined;
          return true;
        },
        offsetX
      );
    }
    moveDown(offsetY) {
      this.addNewInstruction(
        function(offsetY){
          this.setOrientation('DOWN');
          if(this.offsetY === undefined) {
            this.offsetY = this.point.getY() + offsetY;
          }
          if(this.point.getY() < this.offsetY) {
            this.point.setY(this.point.getY() + this.speed);
            if(this.currentSprite <4) {
              this.currentSprite +=1;
            } else {
              this.currentSprite =1;
            }
            return false;
          } 
          this.currentSprite =0;
          this.offsetY = undefined;
          return true;
        },
        offsetY
      );
    }
    moveUp(offsetY) {
      this.addNewInstruction(
        function(offsetY){
          this.setOrientation('UP');
          if(this.offsetY === undefined) {
            this.offsetY = this.point.getY() - offsetY;
          }
          
          if(this.point.getY() > this.offsetY) {
            this.point.setY(this.point.getY() - this.speed);
            if(this.currentSprite <4) {
              this.currentSprite +=1;
            } else {
              this.currentSprite =1;
            }
            return false;
          } 
          this.currentSprite =0;
          this.offsetY = undefined;
          return true;
        },
        offsetY
      );
    }
    addNewInstruction(callback, args) {
      this.instructions.push([callback, args]);
    }
    runInstructions() {
      if(this.instructions.length != 0) {
        if(this.instructions[0][1]) {
          var func = this.instructions[0][0].bind(this, ...[this.instructions[0][1]]);
        } else {
          var func = this.instructions[0][0].bind(this);
        }
        
        
        if(func()) {
          this.instructions.shift();
          if(this.instructions.lenght == 0) {
            this.currentSprite = 0;
          }
        }
      }
    }

    setOrientation( orientation ) {
      this.orientation = orientation;
    }
    
    getOrientation( orientation ) {
      return this.orientation;
    }
  }
});
