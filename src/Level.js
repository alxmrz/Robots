import ObjectFactory from './ObjectFactory';
import Builder from './Builder';
import Point from "@app/Point";
import Wall from "@app/Wall";

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
    this.builder = this.addBuilder( 25, 75 );
    this.wall1 = this.addWall(100, 50)
    this.wall2 = this.addWall(100, 80)
    this.wall3 = this.addWall(100, 120)

  }
  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.collide(this.builder, [this.wall1, this.wall2, this.wall3], );

    if (this.player !== null) {
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
    this.sceneObjects['builders'].push(wall);

    return wall;
  }


  getBuilders() {
    return this.sceneObjects['builders'];
  }


}