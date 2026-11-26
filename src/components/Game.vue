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
        <p id="objectInfo">{{ playerText }}</p>
      </pre>
      </div>
    </div>
    <div>
      mouseX<input type="text" id="mouseX" :value="mouseX"> mouseY<input type="text" id="mouseY" :value="mouseY">
    </div>
    <div id="gameContainer" ref="container" @mousemove="onMouseMove" @mouseleave="onPointerLeave"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import useGame from './composables/useGame';

const container = ref(null);
const { playerInfo, mouseX, mouseY, onMouseMove, onPointerLeave } = useGame(container);

const playerText = computed(() => {
  if (!playerInfo.value) return 'Объект не выбран';
  return `${playerInfo.value.name}: x=${playerInfo.value.x}, y=${playerInfo.value.y}`;
});
</script>

<style>

</style>
