import Gate from "@app/Gate";
import Point from "@app/Point";
import { createScene } from "../helpers/scene";

test("Gate is horizontal by default", function () {
    let gate = new Gate(new Point(0, 0), createScene());

    expect(gate.type).toBe('horizontal');
    expect(gate.width).toBe(75);
    expect(gate.height).toBe(25);
    expect(gate.name).toBe('Gate');
});

test("Gate is vertical when the type is not horizontal", function () {
    let gate = new Gate(new Point(0, 0), createScene(), 'vertical');

    expect(gate.type).toBe('vertical');
    expect(gate.width).toBe(25);
    expect(gate.height).toBe(75);
});
