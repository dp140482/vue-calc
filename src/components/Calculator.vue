<template>
  <div class="hello">
    <div class="display">
      <input v-model.number="op1" @focus="opchoise = 1" />
      <input v-model.number="op2" @focus="opchoise = 2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button @click="calculate('+')">+</button>
      <button @click="calculate('-')">-</button>
      <button @click="calculate('×')">×</button>
      <button @click="calculate('÷')" :disabled="cannot('÷')">÷</button>
      <button @click="calculate('^')" :disabled="cannot('^')">
        x<sup>y</sup>
      </button>
      <button @click="calculate('div')" :disabled="cannot('div')">div</button>
    </div>
    <div class="checkbox-container">
      <input type="checkbox" id="viewnumpad" v-model="showNumpad" />
      <label for="viewnumpad">
        Отображать экранную клавиатуру
      </label>
    </div>
    <div class="keyboard numpad" v-show="showNumpad">
      <button @click="add(1)">1</button>
      <button @click="add(2)">2</button>
      <button @click="add(3)">3</button>
      <button @click="add(4)">4</button>
      <button @click="add(5)">5</button>
      <button @click="add(6)">6</button>
      <button @click="add(7)">7</button>
      <button @click="add(8)">8</button>
      <button @click="add(9)">9</button>
      <button @click="add(0)">0</button>
    </div>
    <div class="radiogroup" v-show="showNumpad">
      <div>
        <input type="radio" id="op1" value="1" v-model.number="opchoise" />
        <label for="op1">Операнд 1</label>
      </div>
      <div>
        <input type="radio" id="op2" value="2" v-model.number="opchoise" />
        <label for="op2">Операнд 2</label>
      </div>
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
      opchoise: 1,
      showNumpad: false,
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
    add(value) {
      if (this.opchoise === 1) {
        this.op1 = this.op1 * 10 + value;
      } else if (this.opchoise === 2) {
        this.op2 = this.op2 * 10 + value;
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
        padding: 5px 10px
        margin: 10px 0
        font-family: consolas
        font-size: 16pt
        line-height: 100%
        min-height: 40px
        color: darkred
        &:disabled
            color: darkgray;
        & sup
            font-size: 8pt

.checkbox-container
      margin: 20px 0
      & label
        cursor: pointer
      & input
        cursor: pointer

.numpad button
    font-size: 14pt

.radiogroup
    margin: 10px 0
    display: flex
    justify-content: center
    gap: 20px
    & label
        cursor: pointer
    & input
        cursor: pointer
        margin: 0 5px
</style>
