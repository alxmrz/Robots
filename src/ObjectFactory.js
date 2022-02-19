import Builder from './Builder';
import Point from './Point';
import Wall from "@app/Wall";


export default class ObjectFactory {
  getBuilder( x, y, scene ) {
    return new Builder( this.getPoint( x, y ), scene );
  }

  getElementById( id ) {
    return document.getElementById( id );
  }

  getPoint( x, y ) {
    return new Point( x, y );
  }

  getWall( x, y, scene ) {
    return new Wall( this.getPoint( x, y ), scene )
  }
}