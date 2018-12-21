<template lang="html">
  <!-- effect-allowed 拖动元素的模式有三种: copy/move/copyMove-->
  <!-- disable-if 类型-bool-是否禁用元素拖动: true禁用拖拽/false启用拖拽-->
  <!-- 使用allowed-types指定允许拖入的元素类型 -->
  <!-- 使用type指定当前元素的类型 -->
  <vddl-draggable class="panel__body--item"
    effect-allowed="copy"
    :draggable="item"
    :type="item.type"
    :index="index"
    :disable-if="disable"
    :selected="selectedEvent"
    :wrapper="list"
    v-bind:class="{'selected': selectedItem === item}">
    <v-card class="panel padding" v-if="item.type === 'container'">
      <div class="panel__heading">
        <!-- <h3>Container {{item.id}}</h3> -->
        <h3><a href="javascript:;">Container {{item.id}}</a></h3>
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
    </v-card>
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
    },
    showItem() {
      return isShowItem = !isShowItem
    }
  },
  data() {
    return {
      isShowItem: false,
      allowedTypesForTree: [],
    }
  }
};
</script>

<style lang="less">
.toggle-box {
  display: none;
}

.nodrag{
  flex: 1;
  display: flex;
}
</style>
