class Scene
{
  show() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    let sceneGrid = new SceneGrid(ctx);
    sceneGrid.printGrid();
    let firstBuilder = new Builder(25,25, ctx);
    let secondBuilder = new Builder(75,25, ctx);
    let thirdBuilder = new Builder(125,25, ctx);
  }
}
