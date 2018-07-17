define( function () {
  return class SceneGrid
  {
    printGrid() {
      this.getCanvasGrid();
      this.printGrass();
      this.printHorizontalLines();
      this.printVerticalLines();
    }

    getCanvasGrid() {
      this.canvas = document.getElementById( "canvasGrid" );
      this.ctx = this.canvas.getContext( "2d" );
    }

    printGrass() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      this.ctx.fillStyle = "green";
      this.ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
    }
    printHorizontalLines() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      for ( var y = 0; y <= canvasHeight; y += 25 ) {
        this.ctx.moveTo( 0, y );
        this.ctx.lineTo( canvasWidth, y );
        this.ctx.stroke();

      }
    }

    printVerticalLines() {
      var canvasWidth = this.canvas.clientWidth;
      var canvasHeight = this.canvas.clientHeight;
      for ( var x = 0; x <= canvasWidth; x += 25 ) {
        this.ctx.moveTo( x, 0 );
        this.ctx.lineTo( x, canvasHeight );
        this.ctx.stroke();

      }
    }
  }
} );
