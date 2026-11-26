import Tower from "@app/Tower";
import Point from "@app/Point";
import { createScene } from "../helpers/scene";

test("Tower initializes with its point and size", function () {
    let tower = new Tower(new Point(10, 20), createScene());

    expect(tower.x).toBe(10);
    expect(tower.y).toBe(20);
    expect(tower.width).toBe(50);
    expect(tower.height).toBe(50);
    expect(tower.name).toBe('Tower');
});
