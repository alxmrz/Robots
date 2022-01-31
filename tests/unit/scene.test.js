import Scene from '@app/Scene'
import ObjectFactory from "@app/ObjectFactory";
import SceneGrid from "@app/SceneGrid";
import sinon from 'sinon'

test( "Setting Object and empty builders array after creating object", function(  ) {
    const factory = createObjectFactory();
    const scene = new Scene(factory);

    expect(factory).toStrictEqual(scene.getFactory());
    expect({'builders' : []}).toStrictEqual(scene.getSceneObjects());
    expect({type: 'canvas'}.type).toStrictEqual(scene.getCanvas().type);
    expect({type: '2d'}).toStrictEqual( scene.getContext());
    expect(scene.getSceneGrid()).toBeInstanceOf(SceneGrid);
});

test( "Setting start game scene", function(  ) {
    const factory = createObjectFactory();
    sinon.stub(factory, 'getSceneGrid').callsFake(function(){
        return {
            printGrid: function () {
                this.printGridCalled = true;
            }
        }
    });

    const scene = new Scene(factory);

    scene.level = {init: function(){}};
    scene.init();
    expect(scene.getSceneGrid().printGridCalled).toBeTruthy();
});

function createObjectFactory() {
    let factory = new ObjectFactory();
    sinon.stub(factory, 'getElementById').callsFake(function(id){
        return {
            type: id,
            getContext: function(contextType) {
                return {type: contextType}
            }
        }
    });

    return factory;
}