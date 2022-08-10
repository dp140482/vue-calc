<template>
  <div class="hello">
    <div class="display">
      <input v-model.number="op1" @focus="opchoise = 1" name="operand1" />
      <input v-model.number="op2" @focus="opchoise = 2" name="operand2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button
        v-for="operand in operands"
        :key="operand.op"
        :name="operand.op"
        @click="calculate(operand.op)"
        :disabled="cannot(operand.op)"
      >
        {{ operand.showAs ? operand.showAs : operand.op }}
      </button>
    </div>
    <div class="checkbox-container">
      <input type="checkbox" id="viewnumpad" v-model="showNumpad" />
      <label for="viewnumpad">
        Отображать экранную клавиатуру
      </label>
    </div>
    <div class="keyboard numpad" v-show="showNumpad">
      <button
        v-for="num in numbuttons"
        :key="num"
        :name="num"
        @click="add(num)"
      >
        {{ num }}
      </button>
      <button @click="del" name="del">←</button>
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
      operands: [
        { op: "+" },
        { op: "-" },
        { op: "×" },
        { op: "÷" },
        { op: "^", showAs: "xⁿ" },
        { op: "div" },
      ],
      op1: 0,
      op2: 0,
      result: 0,
      operator: "",
      opchoise: 1,
      showNumpad: false,
      numbuttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
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
      return this.result;
    },
    cannot(operation = "÷") {
      switch (operation) {
        case "div":
        case "÷":
          return this.op2 === 0;
        case "^":
          return this.op1 === 0 && this.op2 <= 0;
      }
      return false;
    },
    add(value) {
      if (this.opchoise === 1) {
        this.op1 = this.op1 * 10 + value;
      } else if (this.opchoise === 2) {
        this.op2 = this.op2 * 10 + value;
      }
    },
    del() {
      if (this.opchoise === 1) {
        this.op1 = (this.op1 / 10) >> 0;
      } else if (this.opchoise === 2) {
        this.op2 = (this.op2 / 10) >> 0;
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
            color: darkgray
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
