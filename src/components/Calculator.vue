<template>
  <div class="hello">
    <div class="display">
      <input v-model="op1" />
      <input v-model="op2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button @click="result = +op1 + +op2">+</button>
      <button @click="result = op1 - op2">-</button>
      <button @click="result = op1 * op2">×</button>
      <button @click="result = op1 / op2" :disabled="+op2 === 0">÷</button>
      <button
        @click="result = (+op1) ** +op2"
        :disabled="+op1 === 0 && +op2 <= 0"
      >
        ^
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      op1: 0,
      op2: 0,
      result: 0,
      operator: "",
    };
  },
};
</script>

<style scoped lang="sass">
.hello
    margin-top: 50px

.display
    display: flex
    justify-content: center
    align-items: baseline
    font-size: 13pt
    gap: 20px
    margin-bottom: 20px
    & input
        width: 100px
        border: 1px solid darkred
        border-radius: 5px
        font-size: 13pt
        text-align: right
        padding: 3px

.keyboard
    display: flex
    flex-direction: row
    justify-content: center
    gap: 5px
    & button
        width: 40px
        font-size: 16pt
        color: darkred
        &:disabled
            color: darkgray;
</style>
