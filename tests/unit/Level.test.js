import Scene from "@app/Scene";
import ObjectFactory from "@app/ObjectFactory";
import Level from "@app/Level";
import sinon from "sinon";

test("Throw exception if SCENE is not provided", function () {
    expect(() => new Level()).toThrowError(new Error('Scene is not provided!'));
});

test("Test that all objects' instances were created", function () {
    let scene = sinon.createStubInstance(Scene);
    scene.sceneObjects = {'builders': []};


    let factory = new ObjectFactory();

    let level = new Level(scene, factory);
    level.setLevelInstructions = () => {}
    level.init();

    expect(level.getBuilders()[0].getPoint()).toStrictEqual(factory.getPoint(0, 0));
    expect(level.getBuilders()[1].getPoint()).toStrictEqual(factory.getPoint(25, 75));
    expect(level.getBuilders()[2].getPoint()).toStrictEqual(factory.getPoint(25, 125));
});
  
