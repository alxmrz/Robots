define(['../../src/Level', '../../src/Scene', '../../src/ObjectFactory'], function(Level, Scene, ObjectFactory){
  QUnit.module("unit/PointTest");

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
    level.init();
    
    assert.deepEqual(level.getBuilders()[0].getCoords(), factory.getPoint(25, 25));
    assert.deepEqual(level.getBuilders()[1].getCoords(), factory.getPoint(25, 75));
    assert.deepEqual(level.getBuilders()[2].getCoords(), factory.getPoint(25, 125));
  });
  
 });
