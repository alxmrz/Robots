define(['../../src/Application'], function(Application){
  QUnit.module("unit/ApplicationTest");
  var app = new Application();
  console.log(app);
  QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  });
});
