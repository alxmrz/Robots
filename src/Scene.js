define(['../src/SceneGrid', '../src/Builder', '../src/BuilderFabric'], function (SceneGrid, Builder, BuilderFabric) {
  return class Scene
  {
    constructor(builderFabric) {
      this.bf = builderFabric;
      this.builders = [];
    }

    init() {
      this.getMainCanvas();

      this.sceneGrid = new SceneGrid();
      this.sceneGrid.printGrid();

      this.builders[0] = this.bf.getBuilder(25,25, this.ctx);
      this.builders[1] = this.bf.getBuilder(25,75, this.ctx);
      this.builders[2] = this.bf.getBuilder(25,125, this.ctx);
    }

    getMainCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
    }

    show(eventRegister) {

      this.ctx.clearRect(0,0,document.getElementById('canvas').clientWidth,document.getElementById('canvas').clientHeight);
      var time = new Date();

      for (var i = 0; i < this.builders.length; i++) {
        if(true) {
          let coords = this.builders[i].getCoords();

          if(eventRegister.clickCoords !== undefined) {
            let clickedX = eventRegister.clickCoords[0];
            let clickedY = eventRegister.clickCoords[1];

            if((clickedX >= coords[0]&&clickedX<=coords[0]+25)
              && clickedY >= coords[1]&&clickedY<=coords[1]+25
            ) {
              this.builders[i].chosen = true;
            } else if(this.builders[i].chosen) {
              this.builders[i].chosen = false;
            }
            console.log(eventRegister.clickCoords);
          }

          if(coords[0] < 301) {
            this.builders[i].setCoords(coords[0]+1, coords[1]);
          }

        }



        this.builders[i].showYourself();
      }
    }

  }
})
