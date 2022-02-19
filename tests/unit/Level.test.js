import ObjectFactory from "@app/ObjectFactory";
import Level from "@app/Level";

test("Test that all objects' instances were created", function () {
    let factory = new ObjectFactory();

    let level = new Level();
    level.sys = {
        queueDepthSort: function ()  {},
        input: {
            enable: function () {}
        }
    };
    level.add = {
        existing: function() {}
    }
    level.setLevelInstructions = () => {}
    level._init();

    expect(level.getBuilders()[0].getPoint()).toStrictEqual(factory.getPoint(0, 0));
    expect(level.getBuilders()[1].getPoint()).toStrictEqual(factory.getPoint(25, 75));
    expect(level.getBuilders()[2].getPoint()).toStrictEqual(factory.getPoint(25, 125));
});
  
