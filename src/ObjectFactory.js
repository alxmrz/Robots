define(['../src/Builder', '../src/SceneGrid', '../src/Point', '../src/Wall', '../src/Artist'], 
function(Builder, SceneGrid, Point, Wall, Artist){
  class ObjectFactory {
    getBuilder(x,y, scene) {
      return new Builder(this.getPoint(x, y),scene);
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
    
    getWall(x,y,scene) {
      return new Wall(this.getPoint(x,y), scene)
    }
    
    getArtist(scene) {
      return new Artist(scene);
    }
  }
  return ObjectFactory;
});
