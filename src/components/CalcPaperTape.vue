<template>
  <div>
    <div class="history-actions">
      <span class="header">{{headerText}}</span>
      <button class="action-reset"
        v-bind:disabled="records.length === 0"
        v-on:click="resetHistory">{{actionText}}</button>
    </div>
    <div class="history-content">
      <ul v-if="records.length" class="history-list">
      <li v-for="(item, idx) in records" v-bind:key="idx">
        {{item}}
      </li>
    </ul>
    <span class="no-data" v-else>{{noDataMsg}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calc-paper-tape',
    props: ['records'],
    data() {
      return {
        headerText: 'Paper Tape',
        actionText: 'Clear',
        noDataMsg: 'No history to display',
      };
    },
    methods: {
      resetHistory() {
        this.$emit('reset');
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '../variables';

  .history-actions,
  .history-content {
    padding: 10px;
    line-height: 18px;
    font-size: 14px;
    color: darken(@default, 35%);
    font-weight: 500;
  }

  .history-actions {
    .action-reset {
      float: right;
    }
  }

  .history-content {
    .no-data {
      font-style: italic;
    }

    .history-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
</style>
