import Vue from 'vue';
import Calculator from '@/components/Calculator';

describe('Calculator.vue', () => {
  // TODO
  // Create a silly placeholder test for now.
  it('should have tests :P', () => {
    const Constructor = Vue.extend(Calculator);
    const vm = new Constructor().$mount();

    expect(true).toEqual(true);
  });
});
