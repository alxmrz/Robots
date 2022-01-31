import SceneObject from '@app/SceneObject'

test( "Check that exception thrown when we try to make abstract class", function(  ) {
    expect(() => new SceneObject()).toThrowError(new Error("Can't instantiate abstract class!"))
});
