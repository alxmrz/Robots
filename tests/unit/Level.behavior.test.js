import Level from "@app/Level";
import Point from "@app/Point";
import Builder from "@app/Builder";
import { withSceneStubs } from "../helpers/scene";

test("preload creates the grid from the canvas size", function () {
    let level = withSceneStubs(new Level());
    let grid = chainable();
    level.add.grid = jest.fn().mockReturnValue(grid);

    level.preload();

    expect(level.canvas).toBe(level.sys.game.canvas);
    expect(level.add.grid).toHaveBeenCalledWith(0, 0, 800, 600, 25, 25);
    expect(grid.setOrigin).toHaveBeenCalledWith(0, 0);
    expect(grid.setStrokeStyle).toHaveBeenCalledWith(1, 0x000000);
    expect(grid.setCellPadding).toHaveBeenCalledWith(0);
});

test("create registers input, builder and walls", function () {
    let level = withSceneStubs(new Level());
    level.input.on = jest.fn();
    level.events.once = jest.fn();

    level.create();

    expect(level.getBuilders()).toHaveLength(1);
    expect(level.sceneObjects.walls).toHaveLength(3);
    expect(level.input.on).toHaveBeenCalledWith('pointerdown', level.handlePointerDown, level);
    expect(level.events.once).toHaveBeenCalledWith('shutdown', level.handleShutdown, level);
});

test("Right click without a selected builder does nothing", function () {
    let level = withSceneStubs(new Level());
    level.findPath = jest.fn();

    level.handlePointerDown(rightClick(100, 200));

    expect(level.findPath).not.toHaveBeenCalled();
});

test("A selected builder keeps its movement while the debug line is shown", function () {
    let level = withSceneStubs(new Level());
    let builder = createBuilder();
    let path = [new Point(20, 20), new Point(70, 20)];
    level.selectPlayer(builder);
    level.showPath(path);
    builder.resetDestination = jest.fn();
    builder.followPath = jest.fn();
    level.findPath = jest.fn().mockReturnValue(path);
    level.cursors = cursors({ right: true });

    level.handlePointerDown(rightClick(70, 20));
    level.movePlayerByArrows();

    expect(level.pathLine).not.toBeNull();
    expect(builder.followPath).toHaveBeenCalledWith(path);
    expect(builder.body.velocityX).toBe(200);
    expect(builder.body.velocityY).toBe(0);
});

test("Left click without a selected builder does not throw", function () {
    let level = withSceneStubs(new Level());

    expect(() => level.handlePointerDown(leftClick(10, 10))).not.toThrow();
    expect(level.player).toBeNull();
});

test("isPointerOverPlayer is false when nothing is selected", function () {
    let level = withSceneStubs(new Level());

    expect(level.isPointerOverPlayer(leftClick(10, 10))).toBe(false);
});

test("clearPlayerHighlight is safe when nothing is selected", function () {
    let level = withSceneStubs(new Level());

    expect(() => level.clearPlayerHighlight()).not.toThrow();
});

test("notifyPlayerChange without a subscriber still records the info", function () {
    let level = withSceneStubs(new Level());
    let builder = createBuilder();

    expect(() => level.selectPlayer(builder)).not.toThrow();
    expect(level.lastPlayerInfo).toStrictEqual({ name: 'Builder', x: 20, y: 20 });
});

test("handleShutdown resets the scene state", function () {
    let level = withSceneStubs(new Level());
    level.playerChangeHandler = jest.fn();
    level.lastPlayerInfo = { name: 'Builder', x: 20, y: 20 };
    level.player = createBuilder();

    level.handleShutdown();

    expect(level.playerChangeHandler).toBeNull();
    expect(level.lastPlayerInfo).toBeNull();
    expect(level.player).toBeNull();
});

test("handleWallCollision stops a running moveTo", function () {
    let level = withSceneStubs(new Level());
    level.builder = createBuilder();
    level.builder.moveTo = { isRunning: true, stop: jest.fn() };

    level.handleWallCollision();

    expect(level.builder.moveTo.stop).toHaveBeenCalledTimes(1);
});

test("handleWallCollision does not stop an idle moveTo", function () {
    let level = withSceneStubs(new Level());
    level.builder = createBuilder();
    level.builder.moveTo = { isRunning: false, stop: jest.fn() };

    level.handleWallCollision();

    expect(level.builder.moveTo.stop).not.toHaveBeenCalled();
});

test("update polls cursors, collisions and notifies the subscriber", function () {
    let level = withSceneStubs(new Level());
    level.builder = createBuilder();
    level.player = level.builder;
    level.sceneObjects.walls = [];
    level.physics.collide = jest.fn();
    level.notifyPlayerChange = jest.fn();

    level.update(0, 16);

    expect(level.cursors).toBeDefined();
    expect(level.physics.collide).toHaveBeenCalledWith(
        level.builder,
        level.sceneObjects.walls,
        level.handleWallCollision,
        null,
        level
    );
    expect(level.notifyPlayerChange).toHaveBeenCalledTimes(1);
});

test("movePlayerByArrows is a no-op without a selected builder", function () {
    let level = withSceneStubs(new Level());

    expect(() => level.movePlayerByArrows()).not.toThrow();
});

test("Arrow velocity follows the pressed direction", function () {
    let level = withSceneStubs(new Level());

    level.cursors = cursors({ left: true });
    expect(level.getArrowVelocity()).toStrictEqual({ x: -200, y: 0 });

    level.cursors = cursors({ right: true });
    expect(level.getArrowVelocity()).toStrictEqual({ x: 200, y: 0 });

    level.cursors = cursors({ up: true });
    expect(level.getArrowVelocity()).toStrictEqual({ x: 0, y: -200 });

    level.cursors = cursors({ down: true });
    expect(level.getArrowVelocity()).toStrictEqual({ x: 0, y: 200 });
});

test("Arrow velocity is zero when no arrow is pressed", function () {
    let level = withSceneStubs(new Level());

    level.cursors = cursors();

    expect(level.getArrowVelocity()).toStrictEqual({ x: 0, y: 0 });
});

test("addBuilder wires the pointer handler and registers the builder", function () {
    let level = withSceneStubs(new Level());

    let builder = level.addBuilder(10, 20);
    builder.emit('pointerdown', leftClick(10, 20));

    expect(level.getBuilders()).toContain(builder);
    expect(level.player).toBe(builder);
});

test("addBuilder ignores right clicks on the builder", function () {
    let level = withSceneStubs(new Level());

    let builder = level.addBuilder(10, 20);
    builder.emit('pointerdown', rightClick(10, 20));

    expect(level.player).toBeNull();
});

test("addWall registers the wall", function () {
    let level = withSceneStubs(new Level());

    let wall = level.addWall(10, 20);

    expect(level.sceneObjects.walls).toContain(wall);
    expect(wall.getPoint()).toStrictEqual(new Point(10, 20));
});

test("getBuilders returns the builders collection", function () {
    let level = withSceneStubs(new Level());

    expect(level.getBuilders()).toBe(level.sceneObjects.builders);
});

function createLevel() {
    return withSceneStubs(new Level());
}

function createBuilder() {
    return new Builder(new Point(20, 20), createLevel());
}

function cursors(pressed = {}) {
    return {
        left: { isDown: !!pressed.left },
        right: { isDown: !!pressed.right },
        up: { isDown: !!pressed.up },
        down: { isDown: !!pressed.down }
    };
}

function chainable() {
    let target = {};
    target.setOrigin = jest.fn().mockReturnValue(target);
    target.setStrokeStyle = jest.fn().mockReturnValue(target);
    target.setCellPadding = jest.fn().mockReturnValue(target);
    return target;
}

function rightClick(x, y) {
    return {
        x: x,
        y: y,
        rightButtonDown: () => true,
        leftButtonDown: () => false
    };
}

function leftClick(x, y) {
    return {
        x: x,
        y: y,
        rightButtonDown: () => false,
        leftButtonDown: () => true
    };
}
