import ObjectFactory from "@app/ObjectFactory";
import SceneGrid from "@app/SceneGrid";
import Point from "@app/Point";
import Wall from "@app/Wall";
import Scene from "@app/Scene";
import Builder from "@app/Builder";
import sinon from 'sinon'


test("Get builder instance when it is requested", function () {
    let factory = createObjectFactory();
    let builder = factory.getBuilder(20, 20, {});
    expect(builder).toBeInstanceOf(Builder);
    expect(builder.getPoint()).toStrictEqual(new Point(20, 20));
});

test("Get special DOM object by id", function () {
    let factory = createObjectFactory();
    let canvas = {type: 'canvas'};
    let canvasGrid = {type: 'canvasGrid'};

    sinon.stub(factory, 'getElementById').callsFake(function (id) {
        return {
            type: id
        }
    });

    expect(factory.getElementById('canvas')).toStrictEqual(canvas);
    expect(factory.getElementById('canvasGrid')).toStrictEqual(canvasGrid);

});

test("Get SceneGrid instance when it is requested", function () {
    expect(createObjectFactory().getSceneGrid(new Point(20, 20), {})).toBeInstanceOf(SceneGrid);
});

test("Get point instance when it is requested", function () {
    expect(createObjectFactory().getPoint(20, 20)).toBeInstanceOf(Point);
});

test("Get wall instance when it is requested", function () {
    expect(createObjectFactory().getWall(20, 20, sinon.createStubInstance(Scene))).toBeInstanceOf(Wall);

});

function createObjectFactory() {
    return new ObjectFactory();
}