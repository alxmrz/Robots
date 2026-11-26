import ObjectFactory from "@app/ObjectFactory";
import Level from "@app/Level";
import { withSceneStubs } from "../helpers/scene";

test("Test that all objects' instances were created", function () {
    let factory = new ObjectFactory();

    let level = withSceneStubs(new Level());
    level.create();

    expect(level.getBuilders()[0].getPoint()).toStrictEqual(factory.getPoint(125, 175));
    expect(level.sceneObjects['walls'].length).toBe(3);
});
