import Destination from "@app/Destination";
import Point from "@app/Point";
import { createScene } from "../helpers/scene";

test("Destination keeps its point and coordinates", function () {
    let point = new Point(15, 25);
    let destination = new Destination(point, createScene());

    expect(destination.getPoint()).toBe(point);
    expect(destination.x).toBe(15);
    expect(destination.y).toBe(25);
});

test("Destination accepts an explicit radius", function () {
    let destination = new Destination(new Point(1, 2), createScene(), 30);

    expect(destination.x).toBe(1);
    expect(destination.y).toBe(2);
});
