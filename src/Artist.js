define(['../src/Builder'], function(){
  class Artist {
    constructor(scene) {
      this.scene = scene;
      this.ctx = scene.ctx;
    }
    
    drawObject(object) {
      switch(object.getName()) {
        case 'Builder':
          this.drawBuilderWithPrimitives(object);
          break;
        case 'Tower':
          this.drawTowerWithSprites(object);
          break;
        case 'Wall':
          this.drawWallWithPrimitives(object);
          break;
        case 'Gate':
          this.drawGateWithPrimitives(object);
          break;
        case 'RobotFactory':
          this.drawRobotFactoryWithSprites(object);
          break;
      }
    }
    
    drawBuilderWithPrimitives(object) {
      this.showThatChosen(object);
      this.ctx.fillStyle = object.fillStyle;
      this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
    }
    
    drawTowerWithPrimitives(object) {
      this.ctx.fillStyle = object.fillStyle;
      this.ctx.beginPath();
      let x = object.point.getX();
      let y = object.point.getY();
      this.ctx.moveTo(x + object.width*(1/3), y);
      this.ctx.lineTo(x + object.width*(1/3), y);
      this.ctx.lineTo(x + object.width*(2/3), y);
      this.ctx.lineTo(x + object.width, y + object.height*(1/3));
      this.ctx.lineTo(x + object.width, y + object.height*(2/3));
      this.ctx.lineTo(x + object.width*(2/3), y + object.height);
      this.ctx.lineTo(x + object.width*(1/3), y + object.height);
      this.ctx.lineTo(x, y + object.height*(2/3));
      this.ctx.lineTo(x, y + object.height*(1/3));
      this.ctx.moveTo(x + object.width*(1/3), y);
      this.ctx.fill();
    }
    
    drawTowerWithSprites(object) {
      this.ctx.drawImage(document.getElementById('source'),
                470, 0, 60, 70, object.point.getX(), object.point.getY(), object.width, object.height);
    }
    
    showThatChosen(object) {
      if(object.chosen) {
        this.ctx.strokeStyle = 'lime';
        this.ctx.lineWidth=5;
        this.ctx.strokeRect(object.point.getX(), object.point.getY(), object.width, object.height);
      }
    }
    
    drawWallWithPrimitives(object) {
      this.showThatChosen(object);
      this.ctx.fillStyle = object.fillStyle;
      this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
    }
    
    drawGateWithPrimitives(object) {
      this.ctx.fillStyle = object.fillStyle;
      this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
    }
    
    drawRobotFactoryWithPrimitives(object) {
      this.ctx.fillStyle = object.fillStyle;
      this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
    }
    
    drawRobotFactoryWithSprites(object) {
      this.showThatChosen(object);
      this.ctx.drawImage(document.getElementById('source'),
                405, 460, 100, 95, object.point.getX(), object.point.getY(), object.width, object.height);
    }
  }
  
  return Artist;
})


