<!-- Standard calculator button layout -->
<template>
  <div class="buttons" v-bind:data-layout="layout"
      v-on:mousedown="onMousedown"
      v-on:mouseup="onMouseup">
    <div class="button"
      v-for="(button, idx) in buttons"
      v-bind:key="idx"
      v-bind:title="button.desc"
      v-bind:data-type="button.type"
      v-bind:data-value="button.value"
      v-html="button.display">
    </div>
  </div>
</template>

<script>
  // Map of acceptable button value aliases to be used when an input key
  // differs from the standard key in the button layout.
  const valueAliases = {
    Enter: '=',
    Escape: 'allclear',
    c: 'allclear',
  };

  export default {
    name: 'calc-buttons-std',

    // Data constants
    ACTION: {
      AC: 'allclear',
      C: 'clear',
      PCT: 'percent',
      NEGATE: 'negate',
    },

    // Component state
    data() {
      return {
        layout: 'standard',
        // TODO: Button layouts should be importable.
        // Standard layout
        buttons: [
          { type: 'action', value: 'allclear', display: 'AC', desc: '' },
          { type: 'action', value: 'negate', display: '&plusmn;',
            desc: 'Negate the displayed value' },
          { type: 'action', value: 'percent', display: '&#65285;', desc: '' },
          { type: 'operator', value: '/', display: '&#247;',
            desc: 'Divide (or press /)' },
          { type: 'operand', value: '7', display: '7', desc: '' },
          { type: 'operand', value: '8', display: '8', desc: '' },
          { type: 'operand', value: '9', display: '9', desc: '' },
          { type: 'operator', value: '*', display: '&times;',
            desc: 'Multiply (or press *)' },
          { type: 'operand', value: '4', display: '4', desc: '' },
          { type: 'operand', value: '5', display: '5', desc: '' },
          { type: 'operand', value: '6', display: '6', desc: '' },
          { type: 'operator', value: '-', display: '&minus;',
            desc: 'Subtract (or press -)' },
          { type: 'operand', value: '1', display: '1', desc: '' },
          { type: 'operand', value: '2', display: '2', desc: '' },
          { type: 'operand', value: '3', display: '3', desc: '' },
          { type: 'operator', value: '+', display: '&#43;',
            desc: 'Add (or press +)' },
          { type: 'operand', value: '0', display: '0', desc: '' },
          { type: 'operand', value: '.', display: '.', desc: '' },
          { type: 'operator', value: '=', display: '=',
            desc: 'Equal (or press Return)' },
        ],
      };
    },

    // Lifecycle methods
    created() {
      window.addEventListener('keydown', this.onKeydown.bind(this));
      window.addEventListener('keyup', this.onKeyup.bind(this));
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeydown);
      window.removeEventListener('keyup', this.onKeyup);
    },

    // Instance methods
    methods: {
      onKeydown(ev) {
        // TODO: Toggle button active class for keypresses as well.
        this.triggerInput(ev.key);
      },
      onKeyup() {
        // TODO: Toggle button active class for keypresses as well.
      },
      onMousedown(ev) {
        ev.target.classList.add('active');
      },
      onMouseup(ev) {
        ev.target.classList.remove('active');
        this.triggerInput(ev.target.dataset.value);
      },

      // Trigger a calculator input event from the given value. An event will
      // only be triggered if the value matches a corresponding button in the
      // current calculator layout.
      triggerInput(val) {
        // If we have a button mapped to the key that was pressed or clicked
        // then treat it as calculator input.
        const btn = this.buttons.find(item => (
          item.value === val || item.value === valueAliases[val]
        ));

        if (btn) {
          this.$emit((btn.type === 'action') ? 'action' : 'input', btn.value);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '../variables.less';

  .buttons {
    @grid-background: darken(@default, 20%);

    display: inline-grid;
    grid-gap: @gap;
    grid-template-columns: repeat(@rows, @size);
    background: darken(@default, 45%);
    cursor: pointer;
    border-radius: 0 0 5px 5px;

    .button {
      background: @default;
      text-align: center;
      line-height: 50px;

      &:nth-last-child(3) {
        grid-column-start: 1;
        grid-column-end: 3;
        border-radius: 0 0 0 5px;
      }
      &:last-child {
        border-radius: 0 0 5px 0;
      }

      &[data-type="action"] {
        background: darken(@default, 5%);
      }
      &[data-type="operator"] {
        background: @primary;
        color: #fff;

        &.active {
         background: darken(@primary, 12%);
        }
      }
      &.active {
        background: darken(@default, 12%);
      }
    }
  }

</style>
