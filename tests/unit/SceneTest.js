define(['../../src/Scene', '../../src/ObjectFactory', '../../src/SceneGrid', '../../src/Builder'],
function(Scene, ObjectFactory, SceneGrid, Builder){

  QUnit.module("unit/SceneTest");

  QUnit.testStart(function(){
    let factory = new ObjectFactory();
    sinon.stub(factory, 'getElementById').callsFake(function(id){
      return {
        type: id,
        getContext: function(contextType) {
          return {type: contextType}
        }
      }
    });
    QUnit.factory = factory;
  });

  QUnit.test( "Setting Object and empty builders array after creating object", function( assert ) {
    let scene = new Scene(QUnit.factory);
    assert.strictEqual(QUnit.factory, scene.getFactory(),'Super fabrics is the same object');
    assert.deepEqual({'builders' : []}, scene.getSceneObjects(), 'Empty builders provided');
    assert.deepEqual({type: 'canvas'}.type, scene.getCanvas().type, 'Empty builders provided');
    assert.deepEqual({type: '2d'}, scene.getContext(), 'Empty builders provided');
    assert.ok(scene.getSceneGrid() instanceof SceneGrid);
  });

  QUnit.test( "Setting start game scene", function( assert ) {
    sinon.stub(QUnit.factory, 'getSceneGrid').callsFake(function(){
      return {
        printGrid: function () {
            this.printGridCalled = true;
        }
      }
    });

    let scene = new Scene(QUnit.factory);
    scene.level = {init: function(){}};
    scene.init();
    assert.ok(scene.getSceneGrid().printGridCalled);
    for(var i=0;i<scene.getSceneObjects().length;i++) {
      assert.ok(scene.getSceneObjects()[i] instanceof Builder)
    }
  });

});
