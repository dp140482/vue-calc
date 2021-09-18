<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="small-logo" />
    <Calculator />
  </div>
</template>

<script>
import Calculator from "./components/Calculator.vue";

export default {
  name: "App",
  components: {
    Calculator,
  },
};
</script>

<style lang="sass">
#app
  font-family: "Helvetica Neue", Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 10px

.small-logo
  width: 100px
  height: 100px
</style>
