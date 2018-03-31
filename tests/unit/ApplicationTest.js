define(['../../src/Application', '../../src/Scene'], function(Application, Scene){
  QUnit.module("unit/ApplicationTest");


  QUnit.test( "After construction the Application has a scene object", function( assert ) {
    var scene = new Scene();
    var app = new Application(scene);
    assert.strictEqual( scene , app.getScene(), "Equal!" );
  });

  QUnit.test( "Exception is thrown if scene is not passed to an Application", function( assert ) {
    assert.throws (
      function(){
        new Application
      },
      new Error('Scene is not provided!'),
      "Scene is not provided!");
    });

  QUnit.test( "Test of calling Scene::show() method when Application::main() executed", function( assert ) {
    var scene = new Scene();
    var stub = sinon.stub(scene, 'show').callsFake(
      function(){
        this.showCalled = true
      }
    );
    var app = new Application(scene);
    app.main();

    assert.ok( app.getScene().showCalled, "Called!");
  });

});
