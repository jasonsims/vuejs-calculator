<template>
  <div class="display">
    {{value}}
  </div>
</template>

<script>
  export default {
    name: 'calc-display',
    props: ['value'],
  };
</script>

<style lang="less" scoped>
  @import '../variables';

  .display {
    width: 100%;
    height: 80px;
    border: none;
    line-height: 80px;
    font-size: 50px;
    font-weight: 200;
    text-align: right;
    background: darken(@default, 65%);
    padding: 0 18px;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    color: #fff;
  }
</style>
