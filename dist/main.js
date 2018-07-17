/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SceneObject {
  constructor( point ) {
    if ( this.constructor === SceneObject ) {
      throw new Error( "Can't instantiate abstract class!" );
    }
    this.point = point;
    this.canBeChosen = true;
    this.chosen = false;
    this.width;
    this.height;
    this.name = 'SceneObject';
  }

  setCoords( point ) {
    this.point = point;
  }
  getPoint() {
    return this.point;
  }

  printBody() {
    throw new Error( "Call of abstract method showThatChosen" );
  }

  getName() {
    return this.name;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SceneObject;






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Point {
  constructor( x, y ) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX( x ) {
    this.x = x;
  }
  setY( y ) {
    this.y = y;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneGrid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneGrid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SceneGrid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Builder__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Point__ = __webpack_require__(1);





class Scene
{
  constructor( factory ) {
    this.factory = factory;
    this.sceneObjects = { 'builders': [ ] };
    this.canvas = this.factory.getElementById( "canvas" );
    this.ctx = this.canvas.getContext( "2d" );
    this.sceneGrid = this.factory.getSceneGrid();
  }

  init() {
    this.sceneGrid.printGrid();

    this.level.init();
  }

  show( eventRegister ) {

    this.clearCanvas();

    this.level.playLevelScenario( eventRegister );
  }

  clearCanvas() {
    this.ctx.clearRect( 0, 0, this.canvas.clientWidth, this.canvas.clientHeight );
  }

  selectObjectIfClicked( clickCoords, coords, object ) {
    if ( clickCoords !== undefined ) {
      let clickedX = clickCoords.getX();
      let clickedY = clickCoords.getY();
      let objectX = coords.getX();
      let objectY = coords.getY();
      if ( ( clickedX >= objectX && clickedX <= objectX + object.width )
              && clickedY >= objectY && clickedY <= objectY + object.height
              ) {
        console.log( 'check' );
        object.chosen = true;
        this.setLogObjectInfo( object );
      } else if ( object.chosen ) {
        object.chosen = false;
      }
    }
  }

  setLogObjectInfo( object ) {
    const getCircularReplacer = () => {
      const seen = new WeakSet;
      return ( key, value ) => {
        if ( typeof value === "object" && value !== null ) {
          if ( seen.has( value ) ) {
            return;
          }
          seen.add( value );
        }
        return value;
      };
    };
    let objectInfo = document.getElementById( "objectInfo" );
    objectInfo.innerHTML = JSON.stringify( object, getCircularReplacer(), ' ' );
  }

  setNewCoordsToSelectedObject( newCoords, object ) {
    object.setCoords( newCoords );
  }
  moveSelectedObjectToSpecialCoords( spCoords, object ) {

  }

  getFactory() {
    return this.factory;
  }
  getSceneObjects() {
    return this.sceneObjects;
  }
  getCanvas() {
    return this.canvas;
  }
  getContext() {
    return this.ctx;
  }
  getSceneGrid() {
    return this.sceneGrid;
  }
  setLevel( level ) {
    this.level = level;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Point__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Wall__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Tower__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RobotFactory__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Gate__ = __webpack_require__(11);






class Builder extends __WEBPACK_IMPORTED_MODULE_0__SceneObject__["a" /* default */]
{
  constructor( point, scene ) {
    super( point );

    this.fillStyle = 'black';
    this.orientation = 'UP';
    this.currentSprite = 0;
    this.instructions = [ ];
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
            function () {
              this.scene.sceneObjects['builders'].push( new __WEBPACK_IMPORTED_MODULE_2__Wall__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */]( this.point.getX(), this.point.getY() ) ) );
              return true;
            }
    );
  }

  buildTower() {
    this.addNewInstruction(
            function () {
              this.scene.sceneObjects['builders'].push( new __WEBPACK_IMPORTED_MODULE_3__Tower__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */]( this.point.getX(), this.point.getY() ) ) );
              return true;
            }
    );
  }

  buildGate( gateType ) {
    this.addNewInstruction(
            function ( gateType ) {
              this.scene.sceneObjects['builders'].push( new __WEBPACK_IMPORTED_MODULE_5__Gate__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */]( this.point.getX(), this.point.getY() ), gateType ) );
              return true;
            },
            gateType
            );
  }

  buildRobotFactory() {
    this.addNewInstruction(
            function () {
              this.scene.sceneObjects['builders'].push( new __WEBPACK_IMPORTED_MODULE_4__RobotFactory__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */]( this.point.getX(), this.point.getY() ) ) );
              return true;
            }
    );
  }

  moveRight( offsetX ) {
    this.addNewInstruction(
            function ( offset ) {
              let date = new Date();
              this.setOrientation( 'RIGHT' );
              if ( this.offsetX === undefined ) {
                this.offsetX = this.point.getX() + offsetX;
              }

              if ( this.point.getX() < this.offsetX ) {
                this.point.setX( this.point.getX() + this.speed );
                if ( this.seconds !== date.getSeconds() ) {
                  this.nextSecond = date.getSeconds();
                  this.seconds = date.getSeconds();
                  if ( this.currentSprite < 4 ) {
                    this.currentSprite += 1;
                  } else {
                    this.currentSprite = 1;
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
  moveLeft( offsetX ) {
    this.addNewInstruction(
            function ( offset ) {
              this.setOrientation( 'LEFT' );
              if ( this.offsetX === undefined ) {

                this.offsetX = this.point.getX() - offset;

              }

              if ( this.point.getX() > this.offsetX ) {
                this.point.setX( this.point.getX() - this.speed );
                if ( this.currentSprite < 4 ) {
                  this.currentSprite += 1;
                } else {
                  this.currentSprite = 1;
                }
                return false;
              }
              this.currentSprite = 0;
              this.offsetX = undefined;
              return true;
            },
            offsetX
            );
  }
  moveDown( offsetY ) {
    this.addNewInstruction(
            function ( offsetY ) {
              this.setOrientation( 'DOWN' );
              if ( this.offsetY === undefined ) {
                this.offsetY = this.point.getY() + offsetY;
              }
              if ( this.point.getY() < this.offsetY ) {
                this.point.setY( this.point.getY() + this.speed );
                if ( this.currentSprite < 4 ) {
                  this.currentSprite += 1;
                } else {
                  this.currentSprite = 1;
                }
                return false;
              }
              this.currentSprite = 0;
              this.offsetY = undefined;
              return true;
            },
            offsetY
            );
  }
  moveUp( offsetY ) {
    this.addNewInstruction(
            function ( offsetY ) {
              this.setOrientation( 'UP' );
              if ( this.offsetY === undefined ) {
                this.offsetY = this.point.getY() - offsetY;
              }

              if ( this.point.getY() > this.offsetY ) {
                this.point.setY( this.point.getY() - this.speed );
                if ( this.currentSprite < 4 ) {
                  this.currentSprite += 1;
                } else {
                  this.currentSprite = 1;
                }
                return false;
              }
              this.currentSprite = 0;
              this.offsetY = undefined;
              return true;
            },
            offsetY
            );
  }
  addNewInstruction( callback, args ) {
    this.instructions.push( [ callback, args ] );
  }
  runInstructions() {
    if ( this.instructions.length != 0 ) {
      if ( this.instructions[0][1] ) {
        var func = this.instructions[0][0].bind( this, ...[ this.instructions[0][1] ] );
      } else {
        var func = this.instructions[0][0].bind( this );
      }


      if ( func() ) {
        this.instructions.shift();
        if ( this.instructions.lenght == 0 ) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Builder;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Builder__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SceneGrid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SceneGrid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__SceneGrid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Artist__ = __webpack_require__(12);






class ObjectFactory {
  getBuilder( x, y, scene ) {
    return new __WEBPACK_IMPORTED_MODULE_0__Builder__["a" /* default */]( this.getPoint( x, y ), scene );
  }

  getElementById( id ) {
    return document.getElementById( id );
  }

  getSceneGrid( ) {
    return new __WEBPACK_IMPORTED_MODULE_1__SceneGrid___default.a( );
  }

  getPoint( x, y ) {
    return new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* default */]( x, y );
  }

  getWall( x, y, scene ) {
    return new Wall( this.getPoint( x, y ), scene )
  }

  getArtist( scene ) {
    return new __WEBPACK_IMPORTED_MODULE_3__Artist__["a" /* default */]( scene );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectFactory;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
  return class SceneGrid
  {
    printGrid() {
      this.getCanvasGrid();
      this.printGrass();
      this.printHorizontalLines();
      this.printVerticalLines();
    }

    getCanvasGrid() {
      this.canvas = document.getElementById( "canvasGrid" );
      this.ctx = this.canvas.getContext( "2d" );
    }

    printGrass() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      this.ctx.fillStyle = "green";
      this.ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
    }
    printHorizontalLines() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      for ( var y = 0; y <= canvasHeight; y += 25 ) {
        this.ctx.moveTo( 0, y );
        this.ctx.lineTo( canvasWidth, y );
        this.ctx.stroke();

      }
    }

    printVerticalLines() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      for ( var x = 0; x <= canvasWidth; x += 25 ) {
        this.ctx.moveTo( x, 0 );
        this.ctx.lineTo( x, canvasHeight );
        this.ctx.stroke();

      }
    }
  }
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneObject__ = __webpack_require__(0);


class Wall extends __WEBPACK_IMPORTED_MODULE_0__SceneObject__["a" /* default */] {
  constructor( point ) {
    super( point )
    this.width = 25;
    this.height = 25;
    this.fillStyle = 'brown'
    this.name = 'Wall';
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Application__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EventRegister__ = __webpack_require__(14);





( new __WEBPACK_IMPORTED_MODULE_0__Application__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_1__Scene__["a" /* default */]( new __WEBPACK_IMPORTED_MODULE_2__ObjectFactory__["a" /* default */] ), new __WEBPACK_IMPORTED_MODULE_3__EventRegister__["a" /* default */]() ) ).main();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Level__ = __webpack_require__(13);




class Application {
  constructor( scene, eventRegister ) {
    if ( !( scene instanceof __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */] ) ) {
      throw new Error( 'Scene is not provided!' );
    }
    this.scene = scene;
    this.eventRegister = eventRegister;
  }

  main() {
    this.eventRegister.registerAllEvents();

    this.scene.setLevel( new __WEBPACK_IMPORTED_MODULE_1__Level__["a" /* default */]( this.scene, this.scene.factory ) );
    this.scene.init();

    this.game();
  }

  game() {
    this.scene.show( this.eventRegister );
    this.eventRegister.resetMouseEventsCoords();
    window.requestAnimationFrame( this.game.bind( this ) );
  }

  getScene() {
    return this.scene;
  }

  getEventRegister() {
    return this.eventRegister;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Application;





/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneObject__ = __webpack_require__(0);


class Tower extends __WEBPACK_IMPORTED_MODULE_0__SceneObject__["a" /* default */] {
  constructor( point ) {
    super( point )
    this.width = 50;
    this.height = 50;
    this.fillStyle = '#8A2BE2'
    this.name = 'Tower';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tower;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneObject__ = __webpack_require__(0);

class RobotFactory extends __WEBPACK_IMPORTED_MODULE_0__SceneObject__["a" /* default */] {
  constructor( point, scene ) {
    super( point, scene )
    this.width = 100;
    this.height = 100;
    this.fillStyle = '#00008B'
    this.name = 'RobotFactory';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RobotFactory;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneObject__ = __webpack_require__(0);


class Gate extends __WEBPACK_IMPORTED_MODULE_0__SceneObject__["a" /* default */] {
  constructor( point, type = 'horizontal' ) {
    super( point )
    if ( type === 'horizontal' ) {
      this.width = 75;
      this.height = 25;
    } else {
      this.width = 25;
      this.height = 75;
    }

    this.type = type;
    this.fillStyle = '#8A2BE2'
    this.name = 'Gate';
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gate;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Artist {
  constructor( scene ) {
    this.scene = scene;
    this.ctx = scene.ctx;
    this.builderSprites = {
      'RIGHT': [ [ 175, 8 ], [ 175, 70 ], [ 175, 130 ], [ 175, 175 ], [ 175, 225 ] ],
      'LEFT': [ [ 175, 8 ], [ 175, 70 ], [ 175, 130 ], [ 175, 175 ], [ 175, 225 ] ],
      'UP': [ [ 20, 8 ], [ 20, 70 ], [ 20, 130 ], [ 20, 175 ], [ 20, 225 ] ],
      'DOWN': [ [ 310, 8 ], [ 310, 70 ], [ 310, 130 ], [ 310, 175 ], [ 310, 225 ] ]
    };
  }

  drawObject( object ) {
    switch ( object.getName() ) {
      case 'Builder':
        this.drawBuilderWithSprites( object );
        break;
      case 'Tower':
        this.drawTowerWithSprites( object );
        break;
      case 'Wall':
        this.drawWallWithSprites( object );
        break;
      case 'Gate':
        this.drawGateWithSprites( object );
        break;
      case 'RobotFactory':
        this.drawRobotFactoryWithSprites( object );
        break;
    }
  }

  drawBuilderWithPrimitives( object ) {
    this.showThatChosen( object );
    this.ctx.fillStyle = object.fillStyle;
    this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawBuilderWithSprites( object ) {

    this.showThatChosen( object );
    let spriteCoords = this.builderSprites[object.getOrientation()][Math.floor( object.currentSprite )];
    this.ctx.drawImage( document.getElementById( 'unit' ),
            spriteCoords[0], spriteCoords[1], 30, 45, object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawTowerWithPrimitives( object ) {
    this.ctx.fillStyle = object.fillStyle;
    this.ctx.beginPath();
    let x = object.point.getX();
    let y = object.point.getY();
    this.ctx.moveTo( x + object.width * ( 1 / 3 ), y );
    this.ctx.lineTo( x + object.width * ( 1 / 3 ), y );
    this.ctx.lineTo( x + object.width * ( 2 / 3 ), y );
    this.ctx.lineTo( x + object.width, y + object.height * ( 1 / 3 ) );
    this.ctx.lineTo( x + object.width, y + object.height * ( 2 / 3 ) );
    this.ctx.lineTo( x + object.width * ( 2 / 3 ), y + object.height );
    this.ctx.lineTo( x + object.width * ( 1 / 3 ), y + object.height );
    this.ctx.lineTo( x, y + object.height * ( 2 / 3 ) );
    this.ctx.lineTo( x, y + object.height * ( 1 / 3 ) );
    this.ctx.moveTo( x + object.width * ( 1 / 3 ), y );
    this.ctx.fill();
  }

  drawTowerWithSprites( object ) {
    this.showThatChosen( object );
    this.ctx.drawImage( document.getElementById( 'source' ),
            470, 0, 60, 70, object.point.getX(), object.point.getY(), object.width, object.height );
  }

  showThatChosen( object ) {
    if ( object.chosen ) {
      this.ctx.strokeStyle = 'lime';
      this.ctx.lineWidth = 5;
      this.ctx.strokeRect( object.point.getX(), object.point.getY(), object.width, object.height );
    }
  }

  drawWallWithPrimitives( object ) {
    this.showThatChosen( object );
    this.ctx.fillStyle = object.fillStyle;
    this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawWallWithSprites( object ) {
    this.showThatChosen( object );
    this.ctx.drawImage( document.getElementById( 'wall' ),
            0, 30, 30, 30, object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawGateWithPrimitives( object ) {
    this.showThatChosen( object );
    this.ctx.fillStyle = object.fillStyle;
    this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawGateWithSprites( object ) {
    this.showThatChosen( object );
    this.ctx.drawImage( document.getElementById( 'gate' ),
            0, 0, 60, 80, object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawRobotFactoryWithPrimitives( object ) {
    this.showThatChosen( object );
    this.ctx.fillStyle = object.fillStyle;
    this.ctx.fillRect( object.point.getX(), object.point.getY(), object.width, object.height );
  }

  drawRobotFactoryWithSprites( object ) {
    this.showThatChosen( object );
    this.ctx.drawImage( document.getElementById( 'source' ),
            405, 460, 100, 95, object.point.getX(), object.point.getY(), object.width, object.height );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Artist;





/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Builder__ = __webpack_require__(3);




class Level {
  constructor( scene, factory ) {
    if ( !( scene instanceof __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */] ) ) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Level;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(1);


class EventRegister {
  registerAllEvents() {
    this.getMainCanvas();

    this.registerMouserClick();
    this.registerMouseMove();
    this.registerContexMenuClick();
  }

  registerMouserClick() {
    this.canvas.onclick = function ( e ) {
      this.clickCoords = new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */]( this.getCanvasMouseX( e ), this.getCanvasMouseY( e ) );
    }.bind( this );
  }

  getCanvasMouseX( e ) {
    var mouseX = document.getElementById( "mouseX" );
    var x = e.pageX - this.canvas.offsetLeft;
    mouseX.value = x;
    return x;
  }
  getCanvasMouseY( e ) {
    var mouseY = document.getElementById( "mouseY" );
    var y = e.pageY - this.canvas.offsetTop;
    mouseY.value = y;
    return y;
  }

  registerMouseMove() {
    this.canvas.onmousemove = function ( e ) {
      this.lastMouseCoords = new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */]( this.getCanvasMouseX( e ), this.getCanvasMouseY( e ) );
    }.bind( this );
  }

  registerContexMenuClick() {
    this.canvas.oncontextmenu = function ( e ) {
      this.rightClickCoords = new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */]( this.getCanvasMouseX( e ), this.getCanvasMouseY( e ) );
      return false;
    }.bind( this );
  }

  getMainCanvas() {
    this.canvas = document.getElementById( "canvas" );
    this.ctx = this.canvas.getContext( "2d" );
  }

  resetMouseEventsCoords() {
    this.clickCoords = undefined;
    this.lastMouseCoords = undefined;
    this.rightClickCoords = undefined;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventRegister;




/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map