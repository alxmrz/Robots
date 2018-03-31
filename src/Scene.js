define(['../src/SceneGrid', '../src/Builder', '../src/BuilderFabric'], function (SceneGrid, Builder, BuilderFabric) {
  return class Scene
  {
    constructor() {
      this.bf = new BuilderFabric();
    }

    show() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var sceneGrid = new SceneGrid(ctx);
      sceneGrid.printGrid();
      var firstBuilder = this.bf.getBuilder(25,25, ctx);
      firstBuilder.showYourself();
      var secondBuilder = this.bf.getBuilder(75,25, ctx);
      secondBuilder.showYourself();
      var thirdBuilder = this.bf.getBuilder(125,25, ctx);
      thirdBuilder.showYourself();
    }

  }
})
