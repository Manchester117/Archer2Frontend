<template lang="html">
  <!-- effect-allowed 拖动元素的模式有三种: copy/move/copyMove-->
  <!-- disable-if 类型-bool-是否禁用元素拖动: true禁用拖拽/false启用拖拽-->
  <!--  -->
  <vddl-draggable class="panel__body--item"
    effect-allowed="copy"
    :draggable="item"
    :type="item.type"
    :index="index"
    :disable-if="disable"
    :selected="selectedEvent"
    :wrapper="list"
    v-bind:class="{'selected': selectedItem === item}">
    <div class="panel padding" v-if="item.type === 'container'">
      <div class="panel__heading">
        <h3 class="nodrag">Container {{item.id}}</h3>
      </div>
      <vddl-list class="panel__body"
        :list="item.columns"
        :disable-if="disable"
        :external-sources="true"
        :allowed-types="allowedTypesForTree"
        >
        <list v-for="(col, number) in item.columns"
          :key="col.id" :item="col"
          :list="item.columns"
          :index="number"
          :selected="selectedEvent"
          :selected-item="selectedItem"
          :disable="disable">
        </list>
      </vddl-list>
    </div>
    <p v-else>
      {{item.type}} {{item.id}}
    </p>
  </vddl-draggable>
</template>

<script>
export default {
  name: 'list',
  props: ['item', 'list', 'index', 'selected', 'selectedItem', 'disable'],
  methods: {
    selectedEvent(item){
      if (typeof(this.selected) === 'function') {
        this.selected(item);
      }
    }
  },
  data() {
    return {
      allowedTypesForTree: [],
    }
  }
};
</script>

<style lang="less">
.nodrag{
  flex: 1;
  display: flex;
}
</style>
