<template>
  <div class="hello">
    <div class="display">
      <input v-model.number="op1" />
      <input v-model.number="op2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button @click="calculate('+')">+</button>
      <button @click="calculate('-')">-</button>
      <button @click="calculate('×')">×</button>
      <button @click="calculate('÷')" :disabled="cannot('÷')">÷</button>
      <button @click="calculate('^')" :disabled="cannot('^')">^</button>
      <button @click="calculate('div')" :disabled="cannot('div')">div</button>
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
  methods: {
    calculate(operation = "+") {
      switch (operation) {
        case "+":
          this.result = this.op1 + this.op2;
          break;
        case "-":
          this.result = this.op1 - this.op2;
          break;
        case "×":
          this.result = this.op1 * this.op2;
          break;
        case "÷":
          this.result = this.op1 / this.op2;
          break;
        case "^":
          this.result = this.op1 ** this.op2;
          break;
        case "div":
          this.result = (this.op1 / this.op2) >> 0;
          break;
      }
      return result;
    },
    cannot(operation = "÷") {
      switch (operation) {
        case "div":
        case "÷":
          return this.op2 === 0;
        case "^":
          return this.op1 === 0 && this.op2 <= 0;
      }
    },
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
