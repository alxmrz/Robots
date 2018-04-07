define(['../../src/Scene', '../../src/SuperFabric', '../../src/SceneGrid', '../../src/Builder'],
function(Scene, SuperFabric, SceneGrid, Builder){

  QUnit.module("unit/SceneTest");

  QUnit.testStart(function(){
    let sf = new SuperFabric();
    sinon.stub(sf, 'getElementById').callsFake(function(id){
      return {
        type: id,
        getContext: function(contextType) {
          return {type: contextType}
        }
      }
    });
    QUnit.sf = sf;
  });

  QUnit.test( "Setting SuperFabric and empty builders array after init", function( assert ) {
    let scene = new Scene(QUnit.sf);
    assert.strictEqual(QUnit.sf, scene.getFabric(),'Super fabrics is the same object');
    assert.deepEqual([], scene.getBuilders(), 'Empty builders provided');
    assert.deepEqual({type: 'canvas'}.type, scene.getCanvas().type, 'Empty builders provided');
    assert.deepEqual({type: '2d'}, scene.getContext(), 'Empty builders provided');
    assert.ok(scene.getSceneGrid() instanceof SceneGrid);
  });

  QUnit.test( "Setting start game scene", function( assert ) {
    sinon.stub(QUnit.sf, 'getSceneGrid').callsFake(function(){
      return {
        printGrid: function () {
            this.printGridCalled = true;
        }
      }
    });

    let scene = new Scene(QUnit.sf);
    scene.init();
    assert.ok(scene.getSceneGrid().printGridCalled);
    for(var i=0;i<scene.getBuilders().length;i++) {
      assert.ok(scene.getBuilders()[i] instanceof Builder)
    }
  });

});
