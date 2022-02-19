import Wall from "@app/Wall";
import Point from "@app/Point";
import sinon from "sinon";
import Level from "@app/Level";

test("Checking wall initialization", function () {
    let x, y = 20;
    let wall = new Wall(new Point(x, y), createScene());
    expect(wall.getPoint()).toStrictEqual(new Point(x, y));
});


function createScene() {
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

    return scene;
}