define(['../../src/ObjectFactory', '../../src/Builder', '../../src/SceneGrid', '../../src/Point', '../../src/Wall', '../../src/Scene'],
function(ObjectFactory, Builder,SceneGrid, Point, Wall, Scene){
  QUnit.module("unit/ObjectFactoryTest");

  QUnit.test( "Get builder instance when it is requested", function( assert ) {
    let factory = new ObjectFactory();
    let builder = factory.getBuilder(20, 20,{});
    assert.ok( builder instanceof Builder);
    assert.deepEqual (builder.getPoint(), new Point(20,20));
  });

  QUnit.test( "Get special DOM object by id", function( assert ) {
    let factory = new ObjectFactory();
    let canvas = {type: 'canvas'};
    let canvasGrid = {type: 'canvasGrid'};

    sinon.stub(factory, 'getElementById').callsFake(function(id){
      return {
        type: id
      }
    });

    assert.deepEqual (factory.getElementById('canvas'), canvas);
    assert.deepEqual (factory.getElementById('canvasGrid'), canvasGrid);
  });

  QUnit.test( "Get SceneGrid instance when it is requested", function( assert ) {
    let factory = new ObjectFactory();
    let sceneGrid = factory.getSceneGrid(new Point(20,20),{});
    assert.ok( sceneGrid instanceof SceneGrid);
  });
  
    QUnit.test( "Get point instance when it is requested", function( assert ) {
    let factory = new ObjectFactory();
    let point = factory.getPoint(20,20);
    assert.ok( point instanceof Point);
  });
  
  QUnit.test( "Get wall instance when it is requested", function( assert ) {
    let factory = new ObjectFactory();
    var scene = sinon.createStubInstance(Scene);
    let wall = factory.getWall(20,20, scene);
    assert.ok( wall instanceof Wall);
  });

});
