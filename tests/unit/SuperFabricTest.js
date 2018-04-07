define(['../../src/SuperFabric', '../../src/Builder', '../../src/SceneGrid'], function(SuperFabric, Builder,SceneGrid){
  QUnit.module("unit/SuperFabricTest");

  QUnit.test( "Get builder instance when it is requested", function( assert ) {
    let sf = new SuperFabric();
    let builder = sf.getBuilder(20,20,{});
    assert.ok( builder instanceof Builder);
    assert.deepEqual (builder.getCoords(), [20,20]);
  });

  QUnit.test( "Get special object by id", function( assert ) {
    let sf = new SuperFabric();
    let canvas = {type: 'canvas'};
    let canvasGrid = {type: 'canvasGrid'};

    sinon.stub(sf, 'getElementById').callsFake(function(id){
      return {
        type: id
      }
    });

    assert.deepEqual (sf.getElementById('canvas'), canvas);
    assert.deepEqual (sf.getElementById('canvasGrid'), canvasGrid);
  });

  QUnit.test( "Get SceneGrid instance when it is requested", function( assert ) {
    let sf = new SuperFabric();
    let sceneGrid = sf.getSceneGrid(20,20,{});
    assert.ok( sceneGrid instanceof SceneGrid);
  });

});
