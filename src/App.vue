<template>
  <div id="app">
    <main-pannel />
  </div>
</template>

<script>
import MainPannel from "./components/MainPannel.vue";

export default {
  name: "app",
  components: {
    MainPannel,
  },
};
</script>>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  font-family: "Exo", Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin: 0;
  box-sizing: border-box;
}
</style>
