define(['../../src/Level', '../../src/Scene', '../../src/ObjectFactory', '../../src/SceneObject'], function(Level, Scene, ObjectFactory, SceneObject){
  QUnit.module("unit/LevelTest");

  QUnit.test( "Throw exception if SCENE is not provided", function( assert ) {
    assert.throws (
      function() {
        new Level;
      },
      new Error('Scene is not provided!'),
      "Scene is not provided!");
  });
  
  QUnit.test( "Test that all objects' instances were created", function( assert ) {
    let scene = sinon.createStubInstance(Scene);
    scene.sceneObjects = {'builders' : []};
   

    let factory = new ObjectFactory();
    
    let level = new Level(scene, factory);
    level.setLevelInstructions = function(){}
    level.init();
    console.log(level.getBuilders()[0]);
    assert.deepEqual(level.getBuilders()[0].getPoint(), factory.getPoint(0, 0));
    assert.deepEqual(level.getBuilders()[1].getPoint(), factory.getPoint(25, 75));
    assert.deepEqual(level.getBuilders()[2].getPoint(), factory.getPoint(25, 125));
  });
  
 });
