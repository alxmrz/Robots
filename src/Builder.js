define(function(){
  return class Builder
  {
    constructor( x, y, ctx ) {
      this.x = x;
      this.y = y;
      this.fillStyle = 'green'
      this.orientation = 'North';
      this.ctx = ctx;
      this.chosen = false;

    }

    showYourself() {
      if(this.chosen) {
        this.ctx.fillStyle = 'blue';
      } else {
        this.ctx.fillStyle = this.fillStyle;
      }


      this.ctx.fillRect( this.x, this.y, 25, 25 );
      this.printOrientation();
    }
    printOrientation() {
      this.ctx.fillStyle = "red";
      switch ( this.orientation ) {
        case 'North':
          this.ctx.fillRect( this.x, this.y - 2, 25, 1 );
          break;
        case 'South':
          this.ctx.fillRect( this.x, this.y + 24, 25, 1 );
          break;
        case 'West':
          this.ctx.fillRect( this.x - 2, this.y, 1, 25 );
          break;
        case 'East':
          this.ctx.fillRect( this.x + 24, this.y, 1, 25 );
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
      return [this.x, this.y];
    }
    setCoords(x,y) {
      this.x = x;
      this.y = y;
    }
  }
});
