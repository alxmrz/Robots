define(['../src/SceneGrid', '../src/Builder', '../src/SuperFabric', '../src/Point'],
function (SceneGrid, Builder, SuperFabric, Point) {
  return class Scene
  {
    constructor(superFabric) {
      this.sf = superFabric;
      this.sceneObject = [];
      this.canvas = this.sf.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.sceneGrid = this.sf.getSceneGrid();
    }

    init() {
      this.sceneGrid.printGrid();

      this.sceneObject[0] = this.sf.getBuilder(new Point(25,25), this.ctx);
      this.sceneObject[1] = this.sf.getBuilder(new Point(25,75), this.ctx);
      this.sceneObject[2] = this.sf.getBuilder(new Point(25,125), this.ctx);
    }

    show(eventRegister) {

      this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);

      for (var i = 0; i < this.sceneObject.length; i++) {

        let coords = this.sceneObject[i].getCoords();

        this.selectObjectIfClicked(eventRegister.clickCoords, coords, this.sceneObject[i]);

          if(this.sceneObject[i] instanceof Builder) {
            if(this.sceneObject[i].chosen && eventRegister.rightClickCoords != undefined) {
              this.setNewCoordsToSelectedObject(eventRegister.rightClickCoords, this.sceneObject[i]);
            }

            this.moveSelectedObjectToSpecialCoords(eventRegister.rightClickCoords, this.sceneObject[i])
            if(coords.getX() < 301) {
              if(coords.getX()%50 == 0 && coords.getX() !== 300) {
                this.sceneObject.push(this.sceneObject[i].buildWall()) ;
              }
              this.sceneObject[i].setCoords(new Point(coords.getX()+1, coords.getY()));
            }
          }

        this.sceneObject[i].showYourself();
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

    getFabric() {
      return this.sf;
    }
    getsceneObject() {
      return this.sceneObject;
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
  }
})
