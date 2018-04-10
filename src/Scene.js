define(['../src/SceneGrid', '../src/Builder', '../src/ObjectFactory', '../src/Point'],
function (SceneGrid, Builder, ObjectFactory, Point) {
  return class Scene
  {
    constructor(factory) {
      this.factory = factory;
      this.sceneObjects = {'builders': []};
      this.canvas = this.factory.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.sceneGrid = this.factory.getSceneGrid();
    }

    init() {
      this.sceneGrid.printGrid();

      this.level.init();
    }

    show(eventRegister) {

      this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);

      for (var i = 0; i < this.sceneObjects['builders'].length; i++) {

        let coords = this.sceneObjects['builders'][i].getCoords();

        this.selectObjectIfClicked(eventRegister.clickCoords, coords, this.sceneObjects[i]);

          if(this.sceneObjects['builders'][i] instanceof Builder) {
            if(this.sceneObjects['builders'][i].chosen && eventRegister.rightClickCoords != undefined) {
              this.setNewCoordsToSelectedObject(eventRegister.rightClickCoords, this.sceneObjects['builders'][i]);
            }

            this.moveSelectedObjectToSpecialCoords(eventRegister.rightClickCoords, this.sceneObjects['builders'][i])
            if(coords.getX() < 301) {
              if(coords.getX()%50 == 0 && coords.getX() !== 300) {
                this.sceneObjects['builders'].push(this.sceneObjects['builders'][i].buildWall()) ;
              }
              this.sceneObjects['builders'][i].setCoords(new Point(coords.getX()+1, coords.getY()));
            }
          }

        this.sceneObjects['builders'][i].showYourself();
      }
    }

    selectObjectIfClicked(clickCoords, coords, object) {
      if(clickCoords !== undefined) {
        let clickedX = clickCoords.getX();
        let clickedY = clickCoords.getY();
        let objectX = coords.getX();
        let objectY = coords.getY();

        if((clickedX >= objectX&&clickedX<=objectX+25)
          && clickedY >= objectY&&clickedY<=objectY+25
        ) {
          object.chosen = true;
          this.setLogObjectInfo(object);
        } else if(object.chosen) {
          object.chosen = false;
        }
      }
    }

    setLogObjectInfo(object) {
      let objectInfo = document.getElementById("objectInfo");
      objectInfo.innerHTML = JSON.stringify(object, null, ' ');
    }

    setNewCoordsToSelectedObject(newCoords, object) {
      object.setCoords(newCoords) ;
    }
    moveSelectedObjectToSpecialCoords(spCoords, object) {

    }

    getFactory() {
      return this.factory;
    }
    getSceneObjects() {
      return this.sceneObjects;
    }
    getCanvas() {
      return this.canvas;
    }
    getContext() {
      return this.ctx;
    }
    getSceneGrid() {
      return this.sceneGrid;
    }
    setLevel(level) {
      this.level = level;
    }
  }
})
