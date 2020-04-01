<template>
  <div style="border: none;">
    <h1 class="text-orange-500 py-10">
      A crude implementation of the macOS calculator
    </h1>
    <div class="calculator-body">
      <!-- fisrt row -->
      <div class="display">
        <span ref="displayText" :style="{ fontSize: fontSize + 'px' }">{{
          number
        }}</span>
      </div>
      <!-- second row -->
      <div class="buttonAC darkButton" @click="clear">
        <span>{{ lastStep === null ? 'AC' : 'C' }}</span>
      </div>
      <div class="buttonSign darkButton" @click="negatesClicked()">
        <span>+/-</span>
      </div>
      <div class="buttonPercentage darkButton" @click="percentageClicked()">
        <span>%</span>
      </div>
      <div
        class="buttonDivide orangeButton"
        v-bind:class="{ highlighBorder: highlightedKey == '/Button' }"
        @click="operates($event)"
      >
        <span>/</span>
      </div>
      <!-- third row -->
      <div class="num7 lightButton" @click="numberClicked($event)">
        <span>7</span>
      </div>
      <div class="num8 lightButton" @click="numberClicked($event)">
        <span>8</span>
      </div>
      <div class="num9 lightButton" @click="numberClicked($event)">
        <span>9</span>
      </div>
      <div
        class="buttonMultiply orangeButton"
        v-bind:class="{ highlighBorder: highlightedKey == 'xButton' }"
        @click="operates($event)"
      >
        <span>x</span>
      </div>
      <!-- forth row -->
      <div class="num4 lightButton" @click="numberClicked($event)">
        <span>4</span>
      </div>
      <div class="num5 lightButton" @click="numberClicked($event)">
        <span>5</span>
      </div>
      <div class="num6 lightButton" @click="numberClicked($event)">
        <span>6</span>
      </div>
      <div
        class="buttonMinus orangeButton"
        v-bind:class="{ highlighBorder: highlightedKey == '-Button' }"
        @click="operates($event)"
      >
        <span>-</span>
      </div>
      <!-- fifth row -->
      <div class="num1 lightButton" @click="numberClicked($event)">
        <span>1</span>
      </div>
      <div class="num2 lightButton" @click="numberClicked($event)">
        <span>2</span>
      </div>
      <div class="num3 lightButton" @click="numberClicked($event)">
        <span>3</span>
      </div>
      <div
        class="buttonPlus orangeButton"
        v-bind:class="{ highlighBorder: highlightedKey == '+Button' }"
        @click="operates($event)"
      >
        <span>+</span>
      </div>
      <!-- sixth row -->
      <div class="num0 lightButton" @click="numberClicked($event)">
        <span>0</span>
      </div>
      <div class="decimalPoint lightButton" @click="numberClicked($event)">
        <span>.</span>
      </div>
      <div class="equal orangeButton" @click="equates"><span>=</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      number: '0',
      fontSize: 40,
      lastStep: null,
      operation: null,
      highlightedKey: null,
      result: null,
    }
  },
  methods: {
    numberClicked: function(event) {
      const vm = this
      const symbol = event.target.children[0].innerHTML
      if (
        this.lastStep === 'percentageInput' ||
        this.lastStep === 'negatesInput' ||
        this.lastStep === '/' ||
        this.lastStep === 'x' ||
        this.lastStep === '-' ||
        this.lastStep === '+'
      ) {
        this.number = '0'
      }
      // make sure there is only one decimal point and no leading zero
      if (vm.number === '0') {
        symbol === '.' ? (vm.number = '0.') : (vm.number = symbol)
      } else {
        if (symbol === '.' && vm.number.includes('.')) {
          return
        }
        vm.number += symbol
      }
      // calculate the size of display symbols
      if (vm.$refs.displayText.offsetWidth > 175) {
        vm.fontSize = 190 / this.number.length
      }
      this.operation = this.lastStep
      this.lastStep = 'numberInput'
    },
    percentageClicked: function() {
      // percentage button
      const vm = this
      if (vm.number === '0') {
        return
      }
      const floatNumber = parseFloat(vm.number) * 0.01
      vm.number = floatNumber.toString()
      this.lastStep = 'percentageInput'
    },
    negatesClicked: function() {
      // change sign of number
      const vm = this
      if (vm.number === '0') {
        return
      }
      vm.number.includes('-')
        ? (vm.number = vm.number.replace('-', ''))
        : (vm.number = `-${vm.number}`)
      this.lastStep = 'negatesInput'
    },
    clear: function() {
      if (
        this.lastStep === 'numberInput' ||
        this.lastStep === 'percentageInput' ||
        this.lastStep === 'negatesInput'
      ) {
        this.number = '0'
        this.lastStep = null
        return
      }

      if (
        this.lastStep === '/' ||
        this.lastStep === 'x' ||
        this.lastStep === '-' ||
        this.lastStep === '+' ||
        this.lastStep === '='
      ) {
        this.operation = null
        this.lastStep = null
        this.highlightedKey = null
        return
      }

      if (this.lastStep === null) {
        this.number = '0'
        this.operation = null
        this.result = null
        this.highlightedKey = null
        return
      }
    },
    operates: function() {
      this.calculate()
      const symbol = event.target.children[0].innerHTML
      this.lastStep = symbol
      this.highlightedKey = symbol + 'Button'
      this.result = parseFloat(this.number)
    },
    equates: function() {
      this.calculate()
      this.highlightedKey = null
      this.lastStep = '='
    },
    calculate: function() {
      if (
        this.lastStep === '/' ||
        this.lastStep === 'x' ||
        this.lastStep === '-' ||
        this.lastStep === '+' ||
        this.lastStep === '='
      ) {
        return
      }

      if (this.operation === '/') {
        this.result = this.result / parseFloat(this.number)
      }
      if (this.operation === 'x') {
        this.result = this.result * parseFloat(this.number)
      }
      if (this.operation === '-') {
        this.result = this.result - parseFloat(this.number)
      }
      if (this.operation === '+') {
        this.result = this.result + parseFloat(this.number)
      }

      if (this.result !== null) {
        this.number = this.result.toString()
      }
    },
  },
}
</script>

<style scoped>
div {
  color: #d7d7d7;
  border: 1px solid rgba(89, 90, 91, 0.5);
  border-collapse: collapse;
  text-align: center;
}
span {
  display: inline-block;
  transform: translateY(12px);
  cursor: default;
  pointer-events: none;
}
.calculator-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.2),
    0px 20px 25px -15px rgba(0, 0, 0, 0.4);
  margin: auto;
  width: 230px;
  height: 320px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 57px auto;
  grid-template-areas:
    'Display Display Display Display'
    'Display Display Display Display'
    'AC Sign Percentage Divide'
    'Num7 Num8 Num9 MultiplyButton'
    'Num4 Num5 Num6 Minus'
    'Num1 Num2 Num3 Plus'
    'Num0 Num0 DecimalPoint Equal';
}
/* fisrt row */
.display {
  grid-area: Display;
  background-color: #5a5b5b;
  text-align: right;
}
.display span {
  transform: translate(-18px, 15px);
}
/* second row */
.buttonAC {
  grid-area: AC;
}
.buttonSign {
  grid-area: Sign;
}
.buttonPercentage {
  grid-area: Percentage;
}
.buttonDivide {
  grid-area: Divide;
}
/* third row */
.num7 {
  grid-area: Num7;
}
.num8 {
  grid-area: Num8;
}
.num9 {
  grid-area: Num9;
}
.buttonMultiply {
  grid-area: MultiplyButton;
}
/* forth row */
.num4 {
  grid-area: Num4;
}
.num5 {
  grid-area: Num5;
}
.num6 {
  grid-area: Num6;
}
.buttonMinus {
  grid-area: Minus;
}
/* fifth row */
.num1 {
  grid-area: Num1;
}
.num2 {
  grid-area: Num2;
}
.num3 {
  grid-area: Num3;
}
.buttonPlus {
  grid-area: Plus;
}
/* sixth row */
.num0 {
  grid-area: Num0;
}
.decimalPoint {
  grid-area: DecimalPoint;
}
.buttonEqual {
  grid-area: Equal;
}
/* colors */
.darkButton {
  background-color: #69696a;
}
.orangeButton {
  background-color: #f0a23b;
}
.lightButton {
  background-color: #818283;
}
.darkButton,
.lightButton,
.orangeButton {
  cursor: pointer;
}
.darkButton:active {
  background-color: #606161;
}
.orangeButton:active {
  background-color: #be802d;
}
.lightButton:active {
  background-color: #a0a1a0;
}
.highlighBorder {
  border: 1px solid black;
}
</style>
