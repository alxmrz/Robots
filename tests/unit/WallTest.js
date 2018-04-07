define(['../../src/Wall', '../../src/Point'], function(Wall, Point){
  QUnit.module("unit/WallTest");

  QUnit.test( "Checking wall initialization", function( assert ) {
    let x,y = 20;
    let wall = new Wall(new Point(x,y));
    assert.deepEqual(wall.getCoords(), new Point(x,y));
  });

  QUnit.test( "Checking wall self-presentation", function( assert ) {
    let x,y = 20;
    let wall = new Wall(new Point(x,y), {});
    //assert.deepEqual(wall.getCoords(), new Point(x,y));
  });

});
