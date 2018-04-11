define(['../../src/Builder', '../../src/Point', '../../src/Scene'], function(Builder, Point, Scene){
   QUnit.module("unit/BuilderTest");

  QUnit.test( "Check instruction list after query some actions", function( assert ) {
    let builder = new Builder(new Point(20,20), {});
    var scene = sinon.createStubInstance(Scene);
    builder.buildWall(scene);
    builder.moveRight(25);
    builder.moveDown(25);
    console.log(builder.instructions);
    let instructions = [
        function (){}.bind(builder),
        function (){}.bind(builder),
        function (){}.bind(builder),
    ];
    
    assert.ok(instructions == builder.instructions);
    
    
  });
  
  
});