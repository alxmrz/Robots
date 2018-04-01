define(function(){
  return class SceneGrid
  {
    printGrid(){
      this.getCanvasGrid();
      this.printHorizontalLines();
      this.printVerticalLines();
    }

    getCanvasGrid() {
      this.canvas = document.getElementById("canvasGrid");
      this.ctx = this.canvas.getContext("2d");
    }

    printHorizontalLines() {
      var canvasWidth = document.getElementById('canvas').clientWidth;
      var canvasHeight = document.getElementById('canvas').clientHeight;
      for( var y=0;y<=canvasHeight;y+=25) {
        this.ctx.moveTo(0,y);
        this.ctx.lineTo(canvasWidth, y);
        this.ctx.stroke();

      }
    }

    printVerticalLines() {
      var canvasWidth = document.getElementById('canvas').clientWidth;
      var canvasHeight = document.getElementById('canvas').clientHeight;
      for( var x=0;x<=canvasWidth;x+=25) {
        this.ctx.moveTo(x,0);
        this.ctx.lineTo(x, canvasHeight);
        this.ctx.stroke();

      }
    }
  }
});
