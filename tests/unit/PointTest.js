define(['../../src/Point'], function(Point){
  QUnit.module("unit/PointTest");

  QUnit.test( "Check setting point x and y coords", function( assert ) {
    let x = 10;
    let y = 20;
    let point = new Point(x,y);
    assert.ok( point.getX() === x);
    assert.ok( point.getY() === y);
  });
  
  QUnit.test( "Check changing x and y value", function( assert ) {
    let x = 10;
    let y = 20;
    let point = new Point(x,y);
    point.setX(5);
    assert.ok( point.getX() === 5);
    point.setY(55);
    assert.ok( point.getY() === 55);
  });

});
