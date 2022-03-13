<template>
  <div>
    <div style="float:right;">
      <p>Actions:</p>
      <div>
        <input type="button" id="buildWall" value="Строить стену" onclick="alert('Недоступно!')"/>
      </div>
      <div style="width: 300px;">
        <pre>
          <h3>Информация по объекту: </h3>
        <p id="objectInfo">{{player}}</p>
      </pre>
      </div>
    </div>
    <div>
      mouseX<input type="text" id="mouseX" :value="mouseX"> mouseY<input type="text" id="mouseY" :value="mouseY">
    </div>
    <div id="gameContainer" @mousemove="updateCoordinates"></div>
  </div>
</template>

<script>
import Phaser from 'phaser';
import Level from "@app/Level";

export default {
  created() {
    this.level = new Level;
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'gameContainer',
      width: 1075,
      height: 625,
      physics: {
        default: 'arcade',
        arcade: {
          fps: 60,
          gravity: { y: 0 }
        }
      },
      backgroundColor: 0xf4a460,
      scene: this.level
    });

  },
  computed: {
    player() {
      return this.level.player ? JSON.stringify(this.level.player,  null, 4) : 'Объект не выбран';
    }
  },
  data() {
    return {
      game: null,
      mouseX: 0,
      mouseY: 0,

    }
  },
  methods: {
    updateCoordinates() {
      this.mouseX =  this.game.input.mousePointer.x;
      this.mouseY = this.game.input.mousePointer.y;
    }
  }
}
</script>

<style>

</style>