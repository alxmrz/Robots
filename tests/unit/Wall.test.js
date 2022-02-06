import Wall from "@app/Wall";
import Point from "@app/Point";
import Scene from "@app/Scene";
import sinon from "sinon";

test("Checking wall initialization", function () {
    let x, y = 20;
    let scene = sinon.createStubInstance(Scene);
    let wall = new Wall(new Point(x, y), scene);
    expect(wall.getPoint()).toStrictEqual(new Point(x, y));
});
