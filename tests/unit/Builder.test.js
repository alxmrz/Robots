import Builder from "@app/Builder";
import Point from "@app/Point";
import Scene from "@app/Scene";
import sinon from "sinon";

test("Check instruction list after query some actions", function () {
    let builder = new Builder(new Point(20, 20), {});
    let scene = sinon.createStubInstance(Scene);
    builder.buildWall(scene);
    builder.moveRight(25);
    builder.moveDown(25);

    expect(builder.instructions.length).toBe(3);
});
