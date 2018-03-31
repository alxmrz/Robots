define(['../../src/BuilderFabric', '../../src/Builder'], function(BuilderFabric, Builder){
  QUnit.module("unit/BuilderFabricTest");

  QUnit.test( "Get builder instance when it is requested", function( assert ) {
    var bf = new BuilderFabric();
    var builder = bf.getBuilder(20,20,{});
    assert.ok( builder instanceof Builder);
    assert.deepEqual (builder.getCoords(), [20,20]);
  });
});
