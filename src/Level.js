import Phaser from "phaser";
import ObjectFactory from './ObjectFactory';
import Point from "@app/Point";
import Wall from "@app/Wall";
import PriorityQueue from "./libs/PriorityQueue";

/**
 * Arrow key -> velocity direction. Only one axis is applied at a time, which
 * matches the original `else if` chain.
 */
const ARROW_DIRECTIONS = [
    { key: 'left', x: -1, y: 0 },
    { key: 'right', x: 1, y: 0 },
    { key: 'up', x: 0, y: -1 },
    { key: 'down', x: 0, y: 1 }
];

const PLAYER_SPEED = 200;
const PLAYER_HIGHLIGHT = [3, 0xffff00];
const PLAYER_HIGHLIGHT_OFF = [0, 0x000000];
const PATH_LINE = { width: 2, color: 0xff0000, alpha: 0.8 };

export default class Level extends Phaser.Scene {
    constructor() {
        super();
        this.sceneObjects = {
            builders: [],
            walls: []
        };
        this.factory = new ObjectFactory();
        this.player = null;
        this.playerChangeHandler = null;
        this.lastPlayerInfo = null;
        this.cellWidth = 50;
        this.cellHeight = 50;
        this.pathLine = null;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.add.grid(0, 0, this.canvas.clientWidth, this.canvas.clientHeight, 25, 25).setOrigin(0, 0).setStrokeStyle(1, 0x000000).setCellPadding(0);
    };

    create() {
        this.input.mouse.disableContextMenu();

        this.builder = this.addBuilder(125, 175);

        this.addWall(200, 150)
        this.addWall(200, 180)
        this.addWall(200, 220)

        this.input.on('pointerdown', this.handlePointerDown, this);
        this.events.once('shutdown', this.handleShutdown, this);
    }

    /**
     * Single scene-level click handler: the right button targets movement,
     * the left button clears the selection outside the selected object.
     *
     * @param {Phaser.Input.Pointer} pointer
     */
    handlePointerDown(pointer) {
        if (pointer.rightButtonDown()) {
            return this.movePlayerToPointer(pointer);
        }

        return this.clearSelectionOnEmptyClick(pointer);
    }

    /**
     * Draws the whole found path as a debug polyline owned by the scene.
     * The line is not added to physics, so it never affects collisions.
     *
     * @param {Point[]} path
     */
    showPath(path) {
        this.clearPath();

        if (path.length === 0) return;

        this.drawPath(path);
    }

    /**
     * @param {Point[]} path non-empty path
     */
    drawPath(path) {
        this.pathLine = this.add.graphics();
        this.pathLine.lineStyle(PATH_LINE.width, PATH_LINE.color, PATH_LINE.alpha);
        this.pathLine.beginPath();
        path.forEach((point, index) => this.connectPathPoint(point, index));
        this.pathLine.strokePath();
    }

    /**
     * @param {Point} point
     * @param {integer} index
     */
    connectPathPoint(point, index) {
        if (index === 0) {
            return this.pathLine.moveTo(point.getX(), point.getY());
        }

        return this.pathLine.lineTo(point.getX(), point.getY());
    }

    /**
     * Removes the debug path line, keeping the scene free of a stale path.
     */
    clearPath() {
        if (!this.pathLine) return;

        this.pathLine.destroy();
        this.pathLine = null;
    }

    /**
     * @param {Phaser.Input.Pointer} pointer
     */
    movePlayerToPointer(pointer) {
        if (!this.player) return;

        this.player.resetDestination();
        let path = this.findPath(this.player.position(), new Point(pointer.x, pointer.y));
        this.showPath(path);
        this.player.followPath(path);
    }

    /**
     * @param {Phaser.Input.Pointer} pointer
     */
    clearSelectionOnEmptyClick(pointer) {
        if (this.isPointerOverPlayer(pointer)) return;

        this.deselectPlayer();
    }

    /**
     * @param {Phaser.Input.Pointer} pointer
     * @returns {boolean}
     */
    isPointerOverPlayer(pointer) {
        if (!this.player) return false;

        return this.player.getBounds().contains(pointer.x, pointer.y);
    }

    /**
     * @param {Phaser.GameObjects.GameObject} builder
     */
    selectPlayer(builder) {
        this.clearPath();
        this.clearPlayerHighlight();
        this.player = builder;
        builder.setStrokeStyle(...PLAYER_HIGHLIGHT);
        this.notifyPlayerChange();
    }

    deselectPlayer() {
        this.clearPath();
        this.clearPlayerHighlight();
        this.player = null;
        this.notifyPlayerChange();
    }

    clearPlayerHighlight() {
        if (!this.player) return;

        this.player.setStrokeStyle(...PLAYER_HIGHLIGHT_OFF);
    }

    /**
     * @param {Function|null} handler receives plain `{name, x, y}` data or null
     */
    setPlayerChangeHandler(handler) {
        this.playerChangeHandler = handler;
    }

    /**
     * @returns {{name: string, x: number, y: number}|null}
     */
    getPlayerInfo() {
        if (!this.player) return null;

        return this.player.getInfo();
    }

    /**
     * Pushes the selected object state to the subscriber, skipping repeats.
     */
    notifyPlayerChange() {
        let info = this.getPlayerInfo();
        if (this.isSamePlayerInfo(info)) return;

        this.lastPlayerInfo = info;
        this.notifySubscriber(info);
    }

    /**
     * @param {object|null} info
     * @returns {boolean}
     */
    isSamePlayerInfo(info) {
        return JSON.stringify(info) === JSON.stringify(this.lastPlayerInfo);
    }

    /**
     * @param {object|null} info
     */
    notifySubscriber(info) {
        if (!this.playerChangeHandler) return;

        this.playerChangeHandler(info);
    }

    handleShutdown() {
        this.clearPath();
        this.playerChangeHandler = null;
        this.lastPlayerInfo = null;
        this.player = null;
    }

    /**
     * TODO: Methods of pathfinding must be moved to game object classes
     * @param {Point} from
     * @param {Point} to
     */
    findPath(from, to) {
        let queue = new PriorityQueue();
        queue.add(from, 1)
        let processed = new Map();
        let parents = new Map();

        //This map is for migrating to Dijkstra algorithm
        let costs = new Map();

        parents.set(JSON.stringify(to), null)
        let node = null;
        let toRec = this.add.rectangle(to.x, to.y, this.cellWidth, this.cellHeight);
        this.physics.add.existing(toRec);
        while (node = queue.shift()) {
            let nodeRect = this.add.rectangle(node.x, node.y, this.cellWidth, this.cellHeight);
            this.physics.add.existing(nodeRect);

            if (this.physics.collide(toRec, nodeRect)) {
                this.setTargetParent(parents, to, node);
                nodeRect.destroy();
                break;
            }
            nodeRect.destroy();

            processed.set(JSON.stringify(node), true);

            let neighbors = this.neighborsNodes(node, processed, parents, costs);
            neighbors.forEach((neighbor) => {
                let cost = Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y);
                queue.add(neighbor, cost)
            })
        }
        toRec.destroy()

        return this.find(parents, to).reverse();
    }

    /**
     * The target cell can itself be a grid node, so the node is not stored as
     * its own parent: that would make `find` recurse forever.
     *
     * @param {Map} parents
     * @param {Point} to
     * @param {Point} node
     */
    setTargetParent(parents, to, node) {
        if (JSON.stringify(node) === JSON.stringify(to)) return;

        parents.set(JSON.stringify(to), node);
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
        let nodes = [
            new Point(parentNode.x - this.cellWidth, parentNode.y),
            new Point(parentNode.x + this.cellWidth, parentNode.y),
            new Point(parentNode.x, parentNode.y - this.cellHeight),
            new Point(parentNode.x, parentNode.y + this.cellHeight)
        ]

        nodes = nodes.filter((node) => {
            return !this.isOutOfMap(node)
                && this.physics.overlapRect(node.x, node.y, this.cellWidth, this.cellHeight).length === 0
                && !processed.get(JSON.stringify(node))
        })

        nodes.forEach((node) => {
            let parentCost = costs.get(JSON.stringify(parentNode)) ? costs.get(JSON.stringify(parentNode)) : 0;
            costs.set(JSON.stringify(node), parentCost + 1);
            parents.set(JSON.stringify(node), parentNode)
        })

        return nodes;
    }

    isOutOfMap(node) {
        return node.x < 0 || node.x > this.canvas.clientWidth || node.y > this.canvas.clientHeight || node.y < 0
    }

    find(parents, to) {
        let parent = parents.get(JSON.stringify(to));
        if (!parent) {
            return [];
        }

        return [to].concat(this.find(parents, parent));
    }

    update(time, delta) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.collide(this.builder, this.sceneObjects['walls'], this.handleWallCollision, null, this);

        this.movePlayerByArrows();
        this.notifyPlayerChange();
    }

    handleWallCollision() {
        if (this.builder.moveTo.isRunning) {
            this.builder.moveTo.stop();
        }
    }

    movePlayerByArrows() {
        if (this.player === null) return;

        let velocity = this.getArrowVelocity();
        this.player.body.setVelocityX(velocity.x);
        this.player.body.setVelocityY(velocity.y);
    }

    /**
     * @returns {{x: number, y: number}}
     */
    getArrowVelocity() {
        let direction = ARROW_DIRECTIONS.find((arrow) => this.cursors[arrow.key].isDown);
        if (!direction) return { x: 0, y: 0 };

        return { x: direction.x * PLAYER_SPEED, y: direction.y * PLAYER_SPEED };
    }

    /**
     * @param {integer} x
     * @param {integer} y
     */
    addBuilder(x, y) {
        let builder = this.factory.getBuilder(x, y, this);
        builder.on('pointerdown', (pointer) => this.handleBuilderPointerDown(pointer, builder));

        this.sceneObjects['builders'].push(builder);

        return builder;

    }

    /**
     * @param {Phaser.Input.Pointer} pointer
     * @param {Phaser.GameObjects.GameObject} builder
     */
    handleBuilderPointerDown(pointer, builder) {
        if (!pointer.leftButtonDown()) return;

        this.selectPlayer(builder);
    }

    /**
     * @param {integer} x
     * @param {integer} y
     */
    addWall(x, y) {
        let wall = new Wall(new Point(x, y), this);
        this.sceneObjects['walls'].push(wall);

        return wall;
    }

    getBuilders() {
        return this.sceneObjects['builders'];
    }
}
