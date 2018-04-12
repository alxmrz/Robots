define(['../src/SceneObject', '../src/Point', '../src/Wall', '../src/Tower', '../src/RobotFactory', '../src/Gate'], 
function(SceneObject, Point, Wall, Tower, RobotFactory, Gate){
  return class Builder extends SceneObject
  {
    constructor( point, scene ) {
      super( point, scene );

      this.fillStyle = 'black';
      this.orientation = 'North';
      this.instructions = [];
      this.offsetX = undefined;
      this.offsetY = undefined;
      this.speed = 1;
      this.width = 25;
      this.height = 25;
      this.name = 'Строитель';
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
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
      //this.printOrientation();
    }

    
    printOrientation() {
      this.ctx.fillStyle = "red";
      switch ( this.orientation ) {
        case 'North':
          this.ctx.fillRect( this.point.getX(), this.point.getY() - 2, this.width, 1 );
          break;
        case 'South':
          this.ctx.fillRect( this.point.getX(), this.point.getY()+ 24, this.width, 1 );
          break;
        case 'West':
          this.ctx.fillRect( this.point.getX() - 2, this.point.getY(), 1, this.height );
          break;
        case 'East':
          this.ctx.fillRect( this.point.getX() + 24, this.point.getY(), 1, this.height );
          break;

      }
      this.ctx.fillStyle = this.fillStyle;
    }

    buildWall() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new Wall(new Point(this.point.getX(), this.point.getY()), this.scene));
          return true;
        }
      );
    }
    
    buildTower() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new Tower(new Point(this.point.getX(), this.point.getY()), this.scene));
          return true;
        }
      );
    }
    
    buildGate(gateType) {
      this.addNewInstruction(
        function(gateType){
          console.log(gateType);
          this.scene.sceneObjects['builders'].push(new Gate(new Point(this.point.getX(), this.point.getY()), this.scene, gateType));
          return true;
        },
        gateType   
      );
    }
    
    buildRobotFactory() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new RobotFactory(new Point(this.point.getX(), this.point.getY()), this.scene));
          return true;
        }
      );
    }
    
    moveRight(offsetX) {
      this.addNewInstruction(
        function(offset){
          if(this.offsetX === undefined) {
            this.offsetX = this.point.getX() + offsetX;
          }
          
          if(this.point.getX() < this.offsetX) {
            this.point.setX(this.point.getX() + this.speed);
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

          if(this.offsetX === undefined) {
            
            this.offsetX = this.point.getX() - offset;
            
          }
          
          if(this.point.getX() > this.offsetX) {
            this.point.setX(this.point.getX() - this.speed);
            return false;
          } 
          
          this.offsetX = undefined;
          return true;
        },
        offsetX
      );
    }
    moveDown(offsetY) {
      this.addNewInstruction(
        function(offsetY){
          if(this.offsetY === undefined) {
            this.offsetY = this.point.getY() + offsetY;
          }
          if(this.point.getY() < this.offsetY) {
            this.point.setY(this.point.getY() + this.speed);
            return false;
          } 
          this.offsetY = undefined;
          return true;
        },
        offsetY
      );
    }
    moveUp(offsetY) {
      this.addNewInstruction(
        function(offsetY){
          if(this.offsetY === undefined) {
            this.offsetY = this.point.getY() - offsetY;
          }
          
          if(this.point.getY() > this.offsetY) {
            this.point.setY(this.point.getY() - this.speed);
            return false;
          } 
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
        }
      }
    }

    setOrientation( orientation ) {
      this.orientation = orientation;
    }
    getOrientation( orientation ) {
      this.orientation = orientation;
    }
  }
});
