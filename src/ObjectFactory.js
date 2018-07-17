import Builder from './Builder';
import SceneGrid from './SceneGrid';
import Point from './Point';
import Artist from './Artist';


export default class ObjectFactory {
  getBuilder( x, y, scene ) {
    return new Builder( this.getPoint( x, y ), scene );
  }

  getElementById( id ) {
    return document.getElementById( id );
  }

  getSceneGrid( ) {
    return new SceneGrid( );
  }

  getPoint( x, y ) {
    return new Point( x, y );
  }

  getWall( x, y, scene ) {
    return new Wall( this.getPoint( x, y ), scene )
  }

  getArtist( scene ) {
    return new Artist( scene );
  }

}