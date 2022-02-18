<template>
  <div>
    <div style="float:right;">
      <p>Actions:</p>
      <div>
        <input type="button" id="buildWall" value="Строить стену" onclick="alert('Недоступно!')"/>
      </div>
      <div>
        <pre>
        <p id="objectInfo"></p>
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
      backgroundColor: 0x008000,
      scene: new Level
    });

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
      console.log(this.game.input);
    }
  }
}
</script>

<style>

</style>