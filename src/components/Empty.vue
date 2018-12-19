<template>
  <v-card>
    <happy-scroll size="9" hide-horizontal resize>
      <h2>Case-Sequence</h2>
      <Tree :data="originalData" draggable="draggable" crossTree="crossTree" ref="tree1">
        <v-card slot-scope="{data, store}" class="text-sm-left elevation-3" height="30px">
          <b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)" style="vertical-align:middle;font-size:18px;">&nbsp;&nbsp;{{data.open ? '-' : '+'}}</b>
          <b v-else style="vertical-align:middle;font-size:18px;">&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <span style="vertical-align:middle;font-size:14px;">&nbsp;&nbsp;{{data.text}}</span>
        </v-card>
      </Tree>
    </happy-scroll>
  </v-card>
</template>

<script>
import Tree from './dragtree/DraggableTree'
export default {
  components: {Tree},
  data() {
    return {
      originalData: [],
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
</style>
