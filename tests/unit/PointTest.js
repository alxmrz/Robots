define(['../../src/Point'], function(Point){
  QUnit.module("unit/PointTest");

  QUnit.test( "Check setting point x and y coords", function( assert ) {
    let x = 10;
    let y = 20;
    let point = new Point(x,y);
    assert.ok( point.getX() === x);
    assert.ok( point.getY() === y);
  });

});
