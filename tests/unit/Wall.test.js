import Wall from "@app/Wall";
import Point from "@app/Point";
import { createScene } from "../helpers/scene";

test("Checking wall initialization", function () {
    let x, y = 20;
    let wall = new Wall(new Point(x, y), createScene());
    expect(wall.getPoint()).toStrictEqual(new Point(x, y));
});
