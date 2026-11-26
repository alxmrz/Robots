import Builder from "@app/Builder";
import Point from "@app/Point";
import Wall from "@app/Wall";
import Tower from "@app/Tower";
import Gate from "@app/Gate";
import RobotFactory from "@app/RobotFactory";
import Destination from "@app/Destination";
import { createScene } from "../helpers/scene";

test("Check instruction list after query some actions", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.buildWall();
    builder.buildTower();
    builder.buildGate('default');

    expect(builder.instructions.length).toBe(3);
});

test("Movement actions do not add build instructions", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.moveRight(25);
    builder.moveDown(25);

    expect(builder.instructions.length).toBe(0);
    expect(builder.getPoint()).toStrictEqual(new Point(20, 20));
    expect(builder.x).toBe(45);
    expect(builder.y).toBe(45);
});

test("getInfo returns a plain snapshot with rounded coordinates", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.x = 44.6;
    builder.y = 20.4;

    expect(builder.getInfo()).toStrictEqual({ name: 'Builder', x: 45, y: 20 });
});

test("moveLeft and moveUp shift coordinates in the opposite direction", function () {
    let builder = new Builder(new Point(20, 20), createScene());

    builder.moveLeft(5);
    builder.moveUp(7);

    expect(builder.x).toBe(15);
    expect(builder.y).toBe(13);
});

test("getOrientation returns the stored orientation", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.orientation = 'north';

    expect(builder.getOrientation()).toBe('north');
});

test("position returns the physics body position", function () {
    let builder = new Builder(new Point(20, 20), createScene());

    expect(builder.position()).toBe(builder.body.position);
});

test("followPath stores the remaining path and moves to the first point", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    let moveTo = jest.spyOn(builder.moveTo, 'moveTo').mockReturnValue(builder.moveTo);
    let first = new Point(30, 40);
    let second = new Point(50, 60);

    builder.followPath([first, second]);

    expect(builder.destination).toBeInstanceOf(Destination);
    expect(builder.destination.getPoint()).toBe(first);
    expect(builder.path).toStrictEqual([second]);
    expect(moveTo).toHaveBeenCalledWith(30, 40);
});

test("setDestination stores the destination and starts moving", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    let moveTo = jest.spyOn(builder.moveTo, 'moveTo').mockReturnValue(builder.moveTo);
    let destination = new Destination(new Point(30, 40), builder.scene);

    builder.setDestination(destination);

    expect(builder.destination).toBe(destination);
    expect(moveTo).toHaveBeenCalledWith(30, 40);
});

test("A complete event without a remaining path keeps the current destination", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.destination = { destroy: jest.fn() };

    builder.moveTo.emit('complete', builder, builder.moveTo);

    expect(builder.destination.destroy).not.toHaveBeenCalled();
});

test("A complete event with a remaining path advances to the next point", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    let next = new Point(70, 80);
    builder.destination = { destroy: jest.fn() };
    builder.path = [next];
    let moveTo = jest.spyOn(builder.moveTo, 'moveTo').mockReturnValue(builder.moveTo);

    builder.moveTo.emit('complete', builder, builder.moveTo);

    expect(builder.destination).toBeInstanceOf(Destination);
    expect(builder.destination.getPoint()).toBe(next);
    expect(builder.path).toStrictEqual([]);
    expect(moveTo).toHaveBeenCalledWith(70, 80);
});

describe("runInstructions executes and removes ready instructions", function () {
    function setup() {
        let scene = createScene();
        scene.sceneObjects = { builders: [] };
        return new Builder(new Point(20, 20), scene);
    }

    test("no instructions is a no-op", function () {
        let builder = setup();

        builder.runInstructions();

        expect(builder.instructions.length).toBe(0);
        expect(builder.scene.sceneObjects.builders.length).toBe(0);
    });

    test("buildWall adds a wall and consumes the instruction", function () {
        let builder = setup();
        builder.buildWall();

        builder.runInstructions();

        expect(builder.instructions.length).toBe(0);
        expect(builder.scene.sceneObjects.builders[0]).toBeInstanceOf(Wall);
    });

    test("buildTower adds a tower and consumes the instruction", function () {
        let builder = setup();
        builder.buildTower();

        builder.runInstructions();

        expect(builder.scene.sceneObjects.builders[0]).toBeInstanceOf(Tower);
    });

    test("buildGate passes the gate type and consumes the instruction", function () {
        let builder = setup();
        builder.buildGate('vertical');

        builder.runInstructions();

        expect(builder.instructions.length).toBe(0);
        expect(builder.scene.sceneObjects.builders[0]).toBeInstanceOf(Gate);
        expect(builder.scene.sceneObjects.builders[0].type).toBe('vertical');
    });

    test("buildRobotFactory adds a robot factory and consumes the instruction", function () {
        let builder = setup();
        builder.buildRobotFactory();

        builder.runInstructions();

        expect(builder.scene.sceneObjects.builders[0]).toBeInstanceOf(RobotFactory);
    });

    test("an instruction that is not finished is kept for the next run", function () {
        let builder = setup();
        builder.addNewInstruction(function () {
            return false;
        });

        builder.runInstructions();

        expect(builder.instructions.length).toBe(1);
    });

    test("bindInstruction passes the argument when it is present", function () {
        let builder = setup();
        let callback = jest.fn().mockReturnValue(true);
        builder.addNewInstruction(callback, 'argument');

        builder.runInstructions();

        expect(callback).toHaveBeenCalledWith('argument');
    });

    test("bindInstruction omits the argument when it is missing", function () {
        let builder = setup();
        let callback = jest.fn().mockReturnValue(true);
        builder.addNewInstruction(callback);

        builder.runInstructions();

        expect(callback).toHaveBeenCalledWith();
    });
});

test("resetDestination destroys an existing destination", function () {
    let builder = new Builder(new Point(20, 20), createScene());
    builder.destination = { destroy: jest.fn() };

    builder.resetDestination();

    expect(builder.destination.destroy).toHaveBeenCalledTimes(1);
});

test("resetDestination is safe when there is no destination", function () {
    let builder = new Builder(new Point(20, 20), createScene());

    expect(() => builder.resetDestination()).not.toThrow();
});
