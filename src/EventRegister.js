define(function(){
  return class EventRegister {
    registerAllEvents() {
      this.getMainCanvas();
      this.registerMouserClick();
      this.registerMouseMove();
    }
    registerMouserClick() {
      this.canvas.onclick = function(e) {
        var mouseX = document.getElementById("mouseX");
        var mouseY = document.getElementById("mouseY");
        var x = e.pageX - this.canvas.offsetLeft;
        var y = e.pageY - this.canvas.offsetTop;
        this.clickCoords = [x,y];
      }.bind(this);
    }
    registerMouseMove() {
      var current = this;
      this.canvas.onmousemove = function(e, current){
        var mouseX = document.getElementById("mouseX");
        var mouseY = document.getElementById("mouseY");
        let x = e.pageX - this.canvas.offsetLeft;
        let y = e.pageY - this.canvas.offsetTop;
        mouseX.value = x;
        mouseY.value = y;
        this.lastMouseCoords = [x,y];
      }.bind(this);
    }
    getMainCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
    }
    resetMouseEventsCoords() {
      this.clickCoords = undefined;
      this.lastMouseCoords = undefined;
    }
  }
});
