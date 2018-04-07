define(['../src/Point'],function(Point){
  return class EventRegister {
    registerAllEvents() {
      this.getMainCanvas();

      this.registerMouserClick();
      this.registerMouseMove();
      this.registerContexMenuClick();
    }

    registerMouserClick() {
      this.canvas.onclick = function(e) {
        this.clickCoords = new Point(this.getCanvasMouseX(e),this.getCanvasMouseY(e));
      }.bind(this);
    }

    getCanvasMouseX(e) {
      var mouseX = document.getElementById("mouseX");
      var x = e.pageX - this.canvas.offsetLeft;
      return x;
    }
    getCanvasMouseY(e) {
      var mouseY = document.getElementById("mouseY");
      var y = e.pageY - this.canvas.offsetTop;
      return y;
    }

    registerMouseMove() {
      this.canvas.onmousemove = function(e){
        this.lastMouseCoords = new Point(this.getCanvasMouseX(e),this.getCanvasMouseY(e));
      }.bind(this);
    }

    registerContexMenuClick() {
      this.canvas.oncontextmenu = function(e){
        this.rightClickCoords = new Point(this.getCanvasMouseX(e),this.getCanvasMouseY(e));
        return false;
      }.bind(this);
    }

    getMainCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
    }

    resetMouseEventsCoords() {
      this.clickCoords = undefined;
      this.lastMouseCoords = undefined;
      this.rightClickCoords = undefined;
    }
  }
});
