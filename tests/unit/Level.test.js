import ObjectFactory from "@app/ObjectFactory";
import Level from "@app/Level";
import Point from "@app/Point";
import Builder from "@app/Builder";
import { withSceneStubs } from "../helpers/scene";

test("Test that all objects' instances were created", function () {
    let factory = new ObjectFactory();

    let level = createLevel();
    level.create();

    expect(level.getBuilders()[0].getPoint()).toStrictEqual(factory.getPoint(125, 175));
    expect(level.sceneObjects['walls'].length).toBe(3);
});

test("Selecting a builder notifies the subscriber with its info", function () {
    let level = createLevel();
    let builder = createBuilder();
    let handler = jest.fn();
    level.setPlayerChangeHandler(handler);

    level.selectPlayer(builder);

    expect(handler).toHaveBeenCalledWith({ name: 'Builder', x: 20, y: 20 });
    expect(level.player).toBe(builder);
});

test("Deselecting a builder notifies the subscriber with null", function () {
    let level = createLevel();
    let builder = createBuilder();
    let handler = jest.fn();
    level.setPlayerChangeHandler(handler);
    level.selectPlayer(builder);

    level.deselectPlayer();

    expect(handler).toHaveBeenLastCalledWith(null);
    expect(level.player).toBeNull();
});

test("Repeated notifications with the same info are suppressed", function () {
    let level = createLevel();
    let builder = createBuilder();
    let handler = jest.fn();
    level.setPlayerChangeHandler(handler);
    level.selectPlayer(builder);

    level.notifyPlayerChange();
    level.notifyPlayerChange();

    expect(handler).toHaveBeenCalledTimes(1);
});

test("Update notifies only when the selected object position changes", function () {
    let level = createLevel();
    let builder = createBuilder();
    let handler = jest.fn();
    level.setPlayerChangeHandler(handler);
    level.selectPlayer(builder);

    level.update(0, 16);
    expect(handler).toHaveBeenCalledTimes(1);

    builder.x = 45;
    level.update(16, 16);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenLastCalledWith({ name: 'Builder', x: 45, y: 20 });
});

test("Right click moves the selected builder and keeps the selection", function () {
    let level = createLevel();
    let builder = createBuilder();
    level.player = builder;
    builder.resetDestination = jest.fn();
    builder.followPath = jest.fn();
    level.findPath = jest.fn().mockReturnValue([]);

    level.handlePointerDown(rightClick(100, 200));

    expect(level.player).toBe(builder);
    expect(builder.resetDestination).toHaveBeenCalledTimes(1);
    expect(builder.followPath).toHaveBeenCalledTimes(1);
});

test("Left click outside the selected builder clears the selection", function () {
    let level = createLevel();
    let builder = createBuilder();
    level.player = builder;

    level.handlePointerDown(leftClick(500, 500));

    expect(level.player).toBeNull();
});

test("Left click on the selected builder keeps the selection", function () {
    let level = createLevel();
    let builder = createBuilder();
    level.player = builder;

    level.handlePointerDown(leftClick(30, 30));

    expect(level.player).toBe(builder);
});

test("Clicking a builder selects it only with the left button", function () {
    let level = createLevel();
    let builder = createBuilder();

    level.handleBuilderPointerDown(rightClick(30, 30), builder);
    expect(level.player).toBeNull();

    level.handleBuilderPointerDown(leftClick(30, 30), builder);
    expect(level.player).toBe(builder);
});

test("Arrow keys set the selected builder velocity", function () {
    let level = createLevel();
    let builder = createBuilder();
    level.selectPlayer(builder);
    level.cursors = {
        left: { isDown: false },
        right: { isDown: true },
        up: { isDown: false },
        down: { isDown: false }
    };

    level.movePlayerByArrows();

    expect(builder.body.velocityX).toBe(200);
    expect(builder.body.velocityY).toBe(0);
});

function createLevel() {
    return withSceneStubs(new Level());
}

function createBuilder() {
    return new Builder(new Point(20, 20), createLevel());
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
