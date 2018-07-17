import Scene from './Scene';
import ObjectFactory from './ObjectFactory';
import Builder from './Builder';

export default class Level {
  constructor( scene, factory ) {
    if ( !( scene instanceof Scene ) ) {
      throw new Error( 'Scene is not provided!' );
    }
    this.scene = scene;
    this.artist = factory.getArtist( scene );
    this.factory = factory;
  }

  init() {
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

    for ( let x = 0; x < this.scene.canvas.clientWidth - 25; x += 25 ) {
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
      } else if ( x === 1025 ) {
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

    for ( let y = 50; y < this.scene.canvas.clientHeight - 25; y += 25 ) {

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

    for ( let x = this.scene.canvas.clientWidth - 25; x > 0; x -= 25 ) {
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
        continue;
      } else if ( x === 575 ) {
        builder.buildWall();
        builder.moveLeft( 75 );
        builder.buildGate();
        builder.moveLeft( 25 );
        x -= 75;
        continue;
      } else if ( x === 25 ) {
        builder.moveLeft( 25 );
        builder.buildTower();
        builder.moveUp( 25 );
        x -= 25;
        continue;
      } else if ( x !== 0 ) {
        builder.buildWall();
      }
      builder.moveLeft( 25 );
    }

    for ( let y = this.scene.canvas.clientHeight - 50; y > 50; y -= 25 ) {
      if ( y % 400 === 0 ) {
        builder.moveUp( 25 );
        builder.buildTower();
      } else if ( y === 575 ) {
        builder.buildTower();
        builder.moveUp( 25 );
        y -= 25;
        continue;
      } else if ( y === 300 ) {
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
    builder.buildWall();
    builder.moveRight( 50 );
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
    this.scene.sceneObjects['builders'].push( this.factory.getBuilder( x, y, this.scene ) );
  }

  playLevelScenario( eventRegister ) {
    let builders = this.getBuilders();

    builders[0].runInstructions();
    builders[1].runInstructions();

    //Следующий код должен быть в "Движке"
    for ( let builder of builders ) {
      let localCoords = builder.getPoint();
      this.scene.selectObjectIfClicked( eventRegister.clickCoords, localCoords, builder );
      if ( builder.chosen && eventRegister.rightClickCoords !== undefined ) {
        this.scene.setNewCoordsToSelectedObject( eventRegister.rightClickCoords, builder );
      }

      this.scene.moveSelectedObjectToSpecialCoords( eventRegister.rightClickCoords, builder );
      this.artist.drawObject( builder );
    }


  }

  getBuilders() {
    return this.scene.sceneObjects['builders'];
  }

}