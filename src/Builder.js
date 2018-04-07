define(['../src/Point'], function(Point){
  return class Builder
  {
    constructor( point, ctx ) {
      this.point = point;
      this.fillStyle = 'green';
      this.orientation = 'North';
      this.ctx = ctx;
      this.width = 25;
      this.height = 25;
      this.chosen = false;

    }

    showYourself() {
      this.setBlueColorIfObjectChosen();
      this.ctx.fillRect( this.point.getX(), this.point.getY(), this.width, this.height );
      this.printOrientation();
    }

    setBlueColorIfObjectChosen() {
      if(this.chosen) {
        this.ctx.fillStyle = 'blue';
      } else {
        this.ctx.fillStyle = this.fillStyle;
      }
    }
    printOrientation() {
      this.ctx.fillStyle = "red";
      switch ( this.orientation ) {
        case 'North':
          this.ctx.fillRect( this.point.getX(), this.point.getY() - 2, this.width, 1 );
          break;
        case 'South':
          this.ctx.fillRect( this.point.getX(), this.point.getY()+ 24, this.width, 1 );
          break;
        case 'West':
          this.ctx.fillRect( this.point.getX() - 2, this.point.getY(), 1, this.height );
          break;
        case 'East':
          this.ctx.fillRect( this.point.getX() + 24, this.point.getY(), 1, this.height );
          break;

      }

    }

    setOrientation( orientation ) {
      this.orientation = orientation;
    }
    getOrientation( orientation ) {
      this.orientation = orientation;
    }
    getCoords() {
      return this.point;
    }
    setCoords(point) {
      this.point = point;
    }
  }
});
