import ObjectFactory from './ObjectFactory';
import Builder from './Builder';
import Point from "@app/Point";
import Wall from "@app/Wall";
import Destination from "@app/Destination";

export default class Level extends Phaser.Scene{
  constructor() {
    super();
    this.sceneObjects = {
      builders: []
    };
    this.factory = new ObjectFactory();
    this.player = null;
    this.rect =  new Phaser.Geom.Rectangle();
    this.delta = new Phaser.Math.Vector2();
  }
  preload() {
    this.canvas = this.sys.game.canvas;
    this.add.grid(0, 0, this.canvas.clientWidth,  this.canvas.clientHeight, 25, 25).setOrigin(0, 0).setOutlineStyle(0x000000);
  };
  create() {
    this.input.mouse.disableContextMenu();

    this.builder = this.addBuilder( 25, 75 );

    this.addWall(100, 50)
    this.addWall(100, 80)
    this.addWall(100, 120)

    this.input.on('pointerdown', (pointer) => {
       if (pointer.rightButtonDown() && this.player) {
         if (this.player.destination) this.player.destination.destroy();

         this.player.setDestination(new Destination(new Point(pointer.x, pointer.y), this))
         this.physics.moveToObject(this.player,this.player.destination, 240, 1000);

       }
    })


  }
  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.collide(this.builder, this.sceneObjects['walls'], () => {
       if (this.builder.moveTo.isRunning) {
         this.builder.moveTo.stop();
       }
    });


    if (this.player !== null) {
      this.physics.moveTo(this.player,500, 500, 240);
      if (this.player.destination) {
        if (this.player.destination.getPoint() === this.player.getPoint()) {
          alert("destroyed")
          this.player.destination.destroy();
        }
        console.log('move');

      }
      this.player.body.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
      } else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
      }

     /* if (!this.player.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
        // The distance `player` would move in one physics step:
        this.delta.copy(this.player.body.velocity).scale(1 / this.physics.world.fps);

        // For drawing
        this.rect.setTo(
            this.player.body.x + this.delta.x,
            this.player.body.y + this.delta.y,
            this.player.body.width,
            this.player.body.height
        );

        // Check for overlaps.
        let bodies = this.physics.overlapRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height, true, true);

        // Ignore player body.
        Phaser.Utils.Array.Remove(bodies, this.player.body);

        // At least one overlap.
        // Block on the affected axis.
        if (bodies.length) {
          if (this.delta.x) this.player.setVelocityX(0);
          if (this.delta.y) this.player.setVelocityY(0);
        }

        this.graphics.clear().strokeRectShape(this.rect);
      }*/

    }



  }

  addBuilder(x, y ) {
    let builder = this.factory.getBuilder( x, y, this );
    builder.on('pointerdown', function(pointer) {
      this.setStrokeStyle(3, 0xffff00)
    })
    builder.on('pointerdown', (pointer) => {
      this.player = builder;
    })
    this.input.on('pointerdown', function(pointer) {
       if (this.player) {
         this.player.setStrokeStyle(0, 0x000000)
       }
       this.player = null;
    })

    this.sceneObjects['builders'].push( builder );

    return builder;

  }

  addWall(x, y) {
    let wall = new Wall(new Point(x, y),  this);
    this.sceneObjects['walls'].push(wall);

    return wall;
  }


  getBuilders() {
    return this.sceneObjects['builders'];
  }


}