define(['../src/Point', '../src/Wall'], function(Point, Wall){
  return class Builder
  {
    constructor( point, scene ) {
      this.point = point;
      this.fillStyle = 'green';
      this.orientation = 'North';
      this.instructions = [];
      this.scene = scene;
      this.ctx = scene.ctx;
      this.offsetX = undefined;
      this.offsetY = undefined;
      this.speed = 1;
      this.width = 25;
      this.height = 25;
      this.chosen = false;
      this.name = 'Строитель';
    }

    showYourself() {
      this.setBlueColorIfObjectChosen();
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
      this.printOrientation();
    }

    setBlueColorIfObjectChosen() {
      if(this.chosen) {
        this.ctx.fillStyle = 'blue';
      } else {
        this.ctx.fillStyle = this.fillStyle;
      }
    }
    
    buildWall() {
      this.addNewInstruction(
        function(){
          this.scene.sceneObjects['builders'].push(new Wall(new Point(this.point.getX(), this.point.getY()), this.ctx));
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

    }

    setOrientation( orientation ) {
      this.orientation = orientation;
    }
    getOrientation( orientation ) {
      this.orientation = orientation;
    }
    getCoords() {
      return this.point;
    }
    setCoords(point) {
      this.point = point;
    }
  }
});
