define(['SceneGrid', 'Builder'], function (SceneGrid, Builder) {
  return class Scene
  {
    show() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var sceneGrid = new SceneGrid(ctx);
      sceneGrid.printGrid();
      var firstBuilder = new Builder(25,25, ctx);
      var secondBuilder = new Builder(75,25, ctx);
      var thirdBuilder = new Builder(125,25, ctx);
    }
  }
})
