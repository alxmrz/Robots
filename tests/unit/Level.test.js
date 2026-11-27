import ObjectFactory from "@app/ObjectFactory";
import Level from "@app/Level";
import Point from "@app/Point";
import Builder from "@app/Builder";
import { graphicsStub, withSceneStubs } from "../helpers/scene";

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

test("Right click draws the whole found path as a polyline", function () {
    let level = createLevel();
    let builder = createBuilder();
    let lines = trackGraphics(level);
    let path = [new Point(20, 20), new Point(70, 20), new Point(120, 70)];
    level.player = builder;
    builder.resetDestination = jest.fn();
    builder.followPath = jest.fn();
    level.findPath = jest.fn().mockReturnValue(path);

    level.handlePointerDown(rightClick(120, 70));

    let line = lines[0];
    expect(lines).toHaveLength(1);
    expect(line.moveTo).toHaveBeenCalledTimes(1);
    expect(line.moveTo).toHaveBeenCalledWith(20, 20);
    expect(line.lineTo).toHaveBeenCalledTimes(2);
    expect(line.lineTo).toHaveBeenNthCalledWith(1, 70, 20);
    expect(line.lineTo).toHaveBeenNthCalledWith(2, 120, 70);
    expect(line.strokePath).toHaveBeenCalledTimes(1);
    expect(builder.followPath).toHaveBeenCalledWith(path);
});

test("Repeated path search replaces the debug line", function () {
    let level = createLevel();
    let lines = trackGraphics(level);
    level.player = createBuilder();
    level.player.resetDestination = jest.fn();
    level.player.followPath = jest.fn();
    level.findPath = jest.fn().mockReturnValue([new Point(20, 20), new Point(70, 20)]);

    level.handlePointerDown(rightClick(70, 20));
    let firstLine = lines[0];
    level.handlePointerDown(rightClick(70, 20));

    expect(lines).toHaveLength(2);
    expect(firstLine.destroy).toHaveBeenCalledTimes(1);
    expect(level.pathLine).toBe(lines[1]);
});

test("An empty path does not create a debug line", function () {
    let level = createLevel();
    let lines = trackGraphics(level);
    level.player = createBuilder();
    level.player.resetDestination = jest.fn();
    level.player.followPath = jest.fn();
    level.findPath = jest.fn().mockReturnValue([]);

    expect(() => level.handlePointerDown(rightClick(70, 20))).not.toThrow();
    expect(lines).toHaveLength(0);
    expect(level.pathLine).toBeNull();
});

test("Deselecting the builder removes the debug line", function () {
    let level = createLevel();
    let lines = trackGraphics(level);
    level.selectPlayer(createBuilder());
    level.showPath([new Point(20, 20), new Point(70, 20)]);
    let line = lines[0];

    level.deselectPlayer();

    expect(line.destroy).toHaveBeenCalledTimes(1);
    expect(level.pathLine).toBeNull();
});

test("Selecting another builder removes the previous debug line", function () {
    let level = createLevel();
    let lines = trackGraphics(level);
    level.selectPlayer(createBuilder());
    level.showPath([new Point(20, 20), new Point(70, 20)]);
    let firstLine = lines[0];

    level.selectPlayer(createBuilder());

    expect(firstLine.destroy).toHaveBeenCalledTimes(1);
    expect(level.pathLine).toBeNull();
});

test("Scene shutdown removes the debug line", function () {
    let level = createLevel();
    let lines = trackGraphics(level);
    level.showPath([new Point(20, 20), new Point(70, 20)]);
    let line = lines[0];

    level.handleShutdown();

    expect(line.destroy).toHaveBeenCalledTimes(1);
    expect(level.pathLine).toBeNull();
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

/**
 * Replaces the scene graphics factory with a recording double and returns the
 * created lines in creation order.
 */
function trackGraphics(level) {
    let lines = [];
    level.add.graphics = jest.fn(() => {
        let line = graphicsStub();
        lines.push(line);
        return line;
    });
    return lines;
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
