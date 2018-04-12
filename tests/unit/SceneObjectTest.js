define(['../../src/SceneObject'], function(SceneObject){
   QUnit.module("unit/SceneObjectTest");

  QUnit.test( "Check that exception thrown when we try to make abstract class", function( assert ) {
    assert.throws (
      function(){
        new SceneObject
      },
      new Error("Can't instantiate abstract class!"),
      "Instantiating error!");
  });
});