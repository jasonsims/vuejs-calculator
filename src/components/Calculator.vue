<template>
  <div class="calculator history-open">
    <div class="main">
      <calc-display v-bind:value="operand"/>
      <!-- TODO: Add a formula bar component that allows the user to provide
           their own as input (e.g. (5+5)*10). -->
      <calc-buttons-std
        v-on:action="onCalcAction"
        v-on:input="onCalcInput"/>
    </div>
    <calc-paper-tape class="history"
      v-on:reset="resetHistory"
      v-bind:records="history" />
  </div>
</template>

<script>
import CalcDisplay from './CalcDisplay';
import CalcButtonsStd from './CalcButtonsStd';
import CalcPaperTape from './CalcPaperTape';

const operators = ['+', '-', '*', '/'];

export default {
  name: 'Calculator',
  components: {
    CalcDisplay,
    CalcButtonsStd,
    CalcPaperTape,
  },
  data() {
    return {
      operand: '0',
      prevOperand: '',
      operator: '',
      formula: '',
      history: [],
    };
  },

  methods: {

    // Resets all calculation values.
    resetCalculation() {
      this.operand = '0';
      this.prevOperand = null;
      this.operator = null;
      this.formula = '';
    },

    // Resets the formula history.
    resetHistory() {
      this.history = [];
    },

    // Calculate the result of the current formula.
    //
    // @param {boolean} endOfFormula - Start a new formula after calculation
    calculate(endOfFormula) {
      // Keep track of the full formula for historical purposes.
      this.formula += (this.formula)
        ? `${this.operator} ${this.operand} `
        : `${this.prevOperand} ${this.operator} ${this.operand} `;

      // Perform the calculation using the formula value. The usage of eval()
      // here should be safe because we trust the calc buttons component to only
      // emit safe inputs.
      //
      // eslint-disable-next-line no-eval
      const value = eval(this.formula);

      // Update the calculator history and reset the current formula if
      // requested.
      if (endOfFormula) {
        this.history.push(`${this.formula} = ${value}`);
        this.formula = '';
      }

      // The total becomes the new operand.
      this.operand = `${value}`;
      this.prevOperand = null;
    },

    // Returns a boolean indicating if the given value is an operator.
    isOperator(val) {
      return operators.includes(val);
    },

    // Returns true if we have enough information to peform the calculation. We
    // consider the formula ready once we have two operands and an operator.
    formulaReady() {
      return this.prevOperand && this.operand && this.operator;
    },

    // Triggered whenever calculator action is received.
    onCalcAction(actionId) {
      switch (actionId) {
        case CalcButtonsStd.ACTION.AC:
          this.resetCalculation();
          break;
        case CalcButtonsStd.ACTION.PCT:
          this.operand = this.operand / 100;
          break;
        case CalcButtonsStd.ACTION.NEGATE:
          this.operand = this.operand * -1;
          break;
        default:
          throw new Error(`Unknown action id ${actionId}`);
      }
    },

    // Triggered whenever calculator input is received.
    onCalcInput(val) {
      if (val === '=') {
        this.calculate(true);
      } else if (this.isOperator(val)) {
        // Perform the calculation if the formula is ready and update the
        // active operator.
        if (this.formulaReady()) {
          this.calculate();
        }

        this.operator = val;
      } else if (this.operator && !this.prevOperand) {
        // If the input is a number and an operator has already been pressed,
        // then cache the current operand and set the input as the new one.
        // We'll maintain up to two operands then automatically do the
        // calculation once a third is entered.
        this.prevOperand = this.operand;
        this.operand = val;
      } else {
        // Update the current operand value. Append the input to the current
        // value unless it is the default of 0.
        this.operand = (this.operand === '0' && val !== '.')
          ? val : this.operand + val;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../variables';

  .calculator {
    display: flex;

    .main {
      width: ((@size + @gap) * @rows) - @gap;
    }

    .history {
      margin-left: 10px;
      border: solid 1px @default;
      border-radius: 4px;
      min-width: 175px;
    }
  }
</style>
