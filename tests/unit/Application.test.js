import Scene from "@app/Scene";
import Application from "@app/Application";
import EventRegister from "@app/EventRegister";
import sinon from "sinon";
import ObjectFactory from "@app/ObjectFactory";

test("After construction the Application has a scene object", function () {
    let scene = sinon.createStubInstance(Scene);
    let app = new Application(scene);
    expect(scene).toStrictEqual(app.getScene());
});

test("Exception is thrown if scene is not passed to an Application", function () {
    expect(() => new Application()).toThrowError(new Error('Scene is not provided!'));
});

test("Test of calling Scene::show() method when Application::main() executed", function () {
    let sceneStub = sinon.createStubInstance(Scene);
    sceneStub.show.restore();
    sceneStub.factory = sinon.createStubInstance(ObjectFactory);
    sinon.stub(sceneStub, 'show').callsFake(function () {
        this.showCalled = true;
    });
    let eventRegisterMock = sinon.stub(new EventRegister());

    let app = createApplication(sceneStub, eventRegisterMock);
    app.main();

    expect(app.getScene().showCalled).toBeTruthy();
});

test("Test of resetting eventCoords at least 1 time", function () {
    let sceneStub = sinon.createStubInstance(Scene);
    sceneStub.factory = sinon.createStubInstance(ObjectFactory);
    let eventRegisterStub = sinon.stub(new EventRegister());
    eventRegisterStub.resetMouseEventsCoords.restore();
    sinon.stub(eventRegisterStub, 'resetMouseEventsCoords').callsFake(function () {
        this.resetCalled = true;
    });
    let app = createApplication(sceneStub, eventRegisterStub);
    app.main();

    expect(app.getEventRegister().resetCalled).toBeTruthy();
});

/**
 * @param {Scene} scene
 * @param {EventRegister} eventRegister
 * @returns {Application}
 */
function createApplication(scene, eventRegister) {
    let window = {
        requestAnimationFrame(bind) {
        }
    }

    return new Application(scene, eventRegister, window);
}


