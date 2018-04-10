define(['../../src/Application', '../../src/Scene', '../../src/EventRegister', '../../src/ObjectFactory'],
function(Application, Scene, EventRegister, ObjectFactory){
  QUnit.module("unit/ApplicationTest");


  QUnit.test( "After construction the Application has a scene object", function( assert ) {
    var scene = sinon.createStubInstance(Scene);
    console.log(scene);
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
    var sceneStub = sinon.createStubInstance(Scene);
    sceneStub.show.restore();
    sinon.stub(sceneStub, 'show').callsFake(function () {
      this.showCalled = true;
    });
    var eventRegisterMock = sinon.stub(new EventRegister());

    var app = new Application(sceneStub, eventRegisterMock);
    app.main();

    assert.ok( app.getScene().showCalled, "Called!");
  });

  QUnit.test("Test of reseting eventCoords at least 1 time", function( assert ){
    let sceneStub = sinon.createStubInstance(Scene);
    let eventRegisterStub = sinon.stub(new EventRegister());
    eventRegisterStub.resetMouseEventsCoords.restore();
    sinon.stub(eventRegisterStub, 'resetMouseEventsCoords').callsFake(function() {
        this.resetCalled = true;
    });
    var app = new Application(sceneStub, eventRegisterStub);
    app.main();

    assert.ok( app.getEventRegister().resetCalled);
  });

});
