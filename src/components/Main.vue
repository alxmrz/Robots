<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="startGame">Start game</button>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      message: "My Component message"
    };
  },
  methods: {
      startGame() {
          this.$router.push('/game/');
      }
  }
};
</script>