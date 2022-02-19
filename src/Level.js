import ObjectFactory from './ObjectFactory';
import Builder from './Builder';
import Point from "@app/Point";

export default class Level extends Phaser.Scene{
  constructor() {
    super();
    this.sceneObjects = {
      builders: []
    };
    this.factory = new ObjectFactory();
  }
  preload() {
    this.canvas = this.sys.game.canvas;
    this.add.grid(0, 0, this.canvas.clientWidth,  this.canvas.clientHeight, 25, 25).setOrigin(0, 0).setOutlineStyle(0x000000);
  };
  create() {
    this._init();
  }
  update(time, delta) {
    this.playLevelScenario();
  }
  _init() {
    this.addBuilderToScene( 0, 0 );
    this.addBuilderToScene( 25, 75 );
    this.addBuilderToScene( 25, 125 );

    let builders = this.getBuilders();
    this.setLevelInstructions( builders );

  }

  setLevelInstructions( builders ) {
    this.buildWalls( builders[0] );
    this.buildFactories( builders[1] );
  }
  buildWalls( builder ) {
    builder.speed = 2.5;

    for ( let x = 0; x < this.canvas.clientWidth - 25; x += 25 ) {
      if ( x % 400 === 0 ) {
        builder.buildTower();
        x += 25;
        builder.moveRight( 50 );
        continue
      } else if ( x === 500 ) {
        builder.buildGate();
        x += 50;
        builder.moveRight( 75 );
        continue;
      } else if ( x === this.canvas.clientWidth - 50 ) {
        builder.buildTower();
        builder.moveRight( 25 );
        builder.moveDown( 50 );
        x += 25;
        continue;
      } else {
        builder.buildWall();
      }

      builder.moveRight( 25 );
    }

    for ( let y = 50; y < this.canvas.clientHeight - 25; y += 25 ) {

      if ( y % 400 === 0 && y !== 0 ) {
        builder.moveLeft( 25 );
        builder.buildTower();
        builder.moveRight( 25 );
        y += 25;
        builder.moveDown( 50 );
        continue;
      } else if ( y === 575 ) {
        builder.moveLeft( 25 );
        builder.buildTower();
        builder.moveDown( 25 );
        builder.moveLeft( 25 );
        y += 25;
        continue;
      } else if ( y === 225 ) {
        builder.buildGate( 'vertical' );
        y += 50;
        builder.moveDown( 75 );
        continue;
      } else {

        builder.buildWall();
      }

      builder.moveDown( 25 );
    }

    for ( let x = this.canvas.clientWidth - 25; x > 0; x -= 25 ) {
      if ( x % 400 === 0 ) {
        builder.moveUp( 25 );
        builder.moveLeft( 25 );
        builder.buildTower();
        builder.moveDown( 25 );
        builder.moveLeft( 25 );
        x -= 50;
        continue;
      } else if ( x === 25 ) {
        builder.moveUp( 25 );
        builder.moveLeft( 25 );
        builder.buildTower();
        x -= 25;
        builder.moveUp( 25 );

        continue;
      } else if ( x === 575 ) {
        builder.buildWall();
        builder.moveLeft( 75 );
        builder.buildGate();
        builder.moveLeft( 25 );
        x -= 75;
        continue;
      } else if ( x !== 0 ) {
        builder.buildWall();
      }
      builder.moveLeft( 25 );
    }

    for ( let y = this.canvas.clientHeight - 50; y > 50; y -= 25 ) {
      if ( y % 400 === 0 ) {
        builder.buildTower();
      }  else if ( y === 300 ) {
        builder.buildWall();
        builder.moveUp( 75 );
        builder.buildGate( 'vertical' );
        builder.moveUp( 25 );
        y -= 75;

        continue;
      } else {

        builder.buildWall();
      }

      builder.moveUp( 25 );
    }
    builder.moveRight( 50 );
    builder.moveDown(25 );
  }

  buildFactories( builder ) {
    builder.speed = 5;
    builder.moveRight( 100 );

    this.buildFactoriesBlock( builder );


    builder.moveDown( 150 );
    this.buildFactoriesBlock( builder );
    builder.moveRight( 600 );
    builder.moveUp( 125 );
    this.buildFactoriesBlock( builder );

    builder.moveUp( 400 );
    this.buildFactoriesBlock( builder );
    builder.moveLeft( 100 );

  }
  buildFactoriesBlock( builder ) {
    builder.buildRobotFactory();
    builder.moveRight( 125 );
    builder.buildRobotFactory();


    builder.moveDown( 125 );

    builder.buildRobotFactory();
    builder.moveLeft( 125 );
    builder.buildRobotFactory();



  }

  addBuilderToScene( x, y ) {
    this.sceneObjects['builders'].push( this.factory.getBuilder( x, y, this ) );
  }

  playLevelScenario( ) {
    let builders = this.getBuilders();

    builders[0].runInstructions();
    builders[1].runInstructions();

    //Следующий код должен быть в "Движке"
    /*for ( let builder of builders ) {
      let localCoords = builder.getPoint();
      this.scene.selectObjectIfClicked( eventRegister.clickCoords, localCoords, builder );
      if ( builder.chosen && eventRegister.rightClickCoords !== undefined ) {
        this.scene.setNewCoordsToSelectedObject( eventRegister.rightClickCoords, builder );
      }

      this.scene.moveSelectedObjectToSpecialCoords( eventRegister.rightClickCoords, builder );
      this.artist.drawObject( builder );
    }*/


  }

  getBuilders() {
    return this.sceneObjects['builders'];
  }

}