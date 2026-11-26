import RobotFactory from "@app/RobotFactory";
import Point from "@app/Point";
import { createScene } from "../helpers/scene";

test("RobotFactory initializes with its point and size", function () {
    let factory = new RobotFactory(new Point(10, 20), createScene());

    expect(factory.x).toBe(10);
    expect(factory.y).toBe(20);
    expect(factory.width).toBe(100);
    expect(factory.height).toBe(100);
    expect(factory.name).toBe('RobotFactory');
});
