import Builder from "@app/Builder";
import Point from "@app/Point";
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
