define(['../src/SceneGrid', '../src/Builder', '../src/SuperFabric', '../src/Point'],
function (SceneGrid, Builder, SuperFabric, Point) {
  return class Scene
  {
    constructor(superFabric) {
      this.sf = superFabric;
      this.builders = [];
      this.canvas = this.sf.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.sceneGrid = this.sf.getSceneGrid();
    }

    init() {
      this.sceneGrid.printGrid();

      this.builders[0] = this.sf.getBuilder(new Point(25,25), this.ctx);
      this.builders[1] = this.sf.getBuilder(new Point(25,75), this.ctx);
      this.builders[2] = this.sf.getBuilder(new Point(25,125), this.ctx);
    }

    show(eventRegister) {

      this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);

      for (var i = 0; i < this.builders.length; i++) {
        let coords = this.builders[i].getCoords();

        this.selectObjectIfClicked(eventRegister.clickCoords, coords, this.builders[i]);
        if(this.builders[i].chosen && eventRegister.rightClickCoords != undefined) {
          this.setNewCoordsToSelectedObject(eventRegister.rightClickCoords, this.builders[i]);
        }

        this.moveSelectedObjectToSpecialCoords(eventRegister.rightClickCoords, this.builders[i])
        if(coords.getX() < 301) {
          this.builders[i].setCoords(new Point(coords.getX()+1, coords.getY()));
        }

        this.builders[i].showYourself();
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
      object.x = newCoords.getX();
      object.y = newCoords.getY();
    }
    moveSelectedObjectToSpecialCoords(spCoords, object) {

    }

    getFabric() {
      return this.sf;
    }
    getBuilders() {
      return this.builders;
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
