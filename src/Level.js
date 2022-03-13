import ObjectFactory from './ObjectFactory';
import Point from "@app/Point";
import Wall from "@app/Wall";

export default class Level extends Phaser.Scene{
  constructor() {
    super();
    this.sceneObjects = {
      builders: [],
      walls: []
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

    this.builder = this.addBuilder( 125, 175 );

    this.addWall(200, 150)
    this.addWall(200, 180)
    this.addWall(200, 220)

    this.input.on('pointerdown', (pointer) => {
       if (pointer.rightButtonDown() && this.player) {
         if (this.player.destination) this.player.destination.destroy();

         let path = this.findPath(this.player.body.position, new Point(pointer.x, pointer.y));
         this.player.followPath(path);
       }
    })


  }

  findPath(from, to) {
    let queue = [from];
    let processed = new Map();
    let parents = new Map();
    let costs  = new Map();
    parents.set(JSON.stringify(to), null)
    let node = null;
    let toRec =  this.add.rectangle(to.x, to.y, 50, 50);
    this.physics.add.existing(toRec);
    while (node = queue.shift()) {
      let nodeRect =  this.add.rectangle(node.x, node.y, 50, 50);
      this.physics.add.existing(nodeRect);

      if (this.physics.collide(toRec, nodeRect)) {
        parents.set(JSON.stringify(to), node)
        nodeRect.destroy();
        break;
      }
      nodeRect.destroy();

      processed.set(JSON.stringify(node), true);
      queue.push(...this.neighborsNodes(node, processed, parents, costs))
    }

    toRec.destroy()
    toRec.destroy()

    return this.find(parents, to).reverse();
  }

  find(parents, to) {
    let parent = parents.get(JSON.stringify(to));
    if (!parent) {
      return [];
    }

    return [to].concat(this.find(parents, parent));
  }

  /**
   *
   * @param {{x, y}} parentNode
   * @param {Map} processed
   * @param {Map} parents
   * @param {Map} costs
   * @returns {Point[]}
   */
  neighborsNodes(parentNode, processed, parents, costs) {
    let nodes =  [
      new Point(parentNode.x-50, parentNode.y),
      new Point(parentNode.x+50, parentNode.y),
      new Point(parentNode.x, parentNode.y-50),
      new Point(parentNode.x, parentNode.y+50)
    ]

    nodes = nodes.filter( (node) => {
      return !this.isOutOfMap(node)
          && this.physics.overlapRect(node.x, node.y, 50, 50).length === 0
          && !processed.get(JSON.stringify(node))
    })

    nodes.forEach((node) => {
      let parentCost = costs.get(JSON.stringify(parentNode)) ? costs.get(JSON.stringify(parentNode)) : 0;
      costs.set(JSON.stringify(node), parentCost + 1);
      /*if (parents.get(JSON.stringify(node)) && ) {

      }*/
      parents.set(JSON.stringify(node), parentNode)
    })

    return nodes;
  }

  isOutOfMap(node) {
    return node.x < 0 || node.x > this.canvas.clientWidth || node.y > this.canvas.clientHeight || node.y < 0
  }

  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.collide(this.builder, this.sceneObjects['walls'], () => {
       if (this.builder.moveTo.isRunning) {
         this.builder.moveTo.stop();
       }
    });


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