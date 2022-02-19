import Builder from "@app/Builder";
import Point from "@app/Point";
import Level from "@app/Level";
import sinon from "sinon";

test("Check instruction list after query some actions", function () {
    let scene = sinon.createStubInstance(Level);
    scene.sys = {
        queueDepthSort: function ()  {},
        input: {
            enable: function () {}
        }
    };
    scene.add = {
        existing: function() {}
    }
    let builder = new Builder(new Point(20, 20), scene);
    builder.buildWall();
    builder.moveRight(25);
    builder.moveDown(25);

    expect(builder.instructions.length).toBe(3);
});
