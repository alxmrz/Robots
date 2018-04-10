define(['../src/Builder', '../src/SceneGrid', '../src/Point', '../src/Wall'], function(Builder, SceneGrid, Point, Wall){
  class SuperFabric {
    getBuilder(x,y, ctx) {
      return new Builder(x,y,ctx);
    }
    
    getElementById(id) {
      return document.getElementById(id);
    }

    getSceneGrid() {
      return new SceneGrid();
    }
    
    getPoint( x, y ) {
      return new Point( x, y );
    }
    
    getWall(x,y,ctx) {
      return new Wall(this.getPoint(x,y), ctx)
    }
  }
  return SuperFabric;
});
