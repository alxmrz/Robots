define(function(){
  class Wall {
    constructor(point, ctx) {
      this.point = point;
      this.chosen = false;
      this.width = 25;
      this.ctx = ctx;
      this.height = 25;
      this.fillStyle = 'brown'
      this.name = 'Стена';
    }

    getCoords() {
      return this.point;
    }

    showYourself() {
      this.setBlueColorIfObjectChosen();
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
    }

    setBlueColorIfObjectChosen() {
      if(this.chosen) {
        this.ctx.fillStyle = 'yellow';
      } else {
        this.ctx.fillStyle = this.fillStyle;
      }
    }

  }
  return Wall;
});
