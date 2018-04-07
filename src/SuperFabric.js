define(['../src/Builder', '../src/SceneGrid'], function(Builder, SceneGrid){
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
  }
  return SuperFabric;
});
