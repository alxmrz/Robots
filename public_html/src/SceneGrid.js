class SceneGrid
{
  constructor( ctx ) {
    this.ctx = ctx;

  }
  printGrid(){
    this.printHorizontalLines();
    this.printVerticalLines();

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
    for( var x=0;x<=canvasHeight;x+=25) {
      this.ctx.moveTo(x,0);
      this.ctx.lineTo(x, canvasHeight);
      this.ctx.stroke();

    }
  }
}
