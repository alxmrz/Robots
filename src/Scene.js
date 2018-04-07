define(['../src/SceneGrid', '../src/Builder', '../src/SuperFabric'], function (SceneGrid, Builder, SuperFabric) {
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

      this.builders[0] = this.sf.getBuilder(25,25, this.ctx);
      this.builders[1] = this.sf.getBuilder(25,75, this.ctx);
      this.builders[2] = this.sf.getBuilder(25,125, this.ctx);
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
        if(coords[0] < 301) {
          this.builders[i].setCoords(coords[0]+1, coords[1]);
        }

        this.builders[i].showYourself();
      }
    }

    selectObjectIfClicked(clickCoords, coords, object) {
      if(clickCoords !== undefined) {
        let clickedX = clickCoords[0];
        let clickedY = clickCoords[1];
        let objectX = coords[0];
        let objectY = coords[1];

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
      object.x = newCoords[0];
      object.y = newCoords[1];
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
