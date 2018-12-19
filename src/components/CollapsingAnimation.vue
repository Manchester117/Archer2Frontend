<template>
  <v-card>
    <happy-scroll size="9" hide-horizontal resize>
      <h2>Interface-Collection</h2>
      <Tree :data="originalData" draggable="draggable" crossTree="crossTree" ref="tree1" @change="tree1Change" @drag="ondrag" @drop="ondrop">
      <!-- <Tree :data="originalData" draggable="draggable" crossTree="crossTree" ref="tree1" @drag="ondrag" @drop="ondrop"> -->
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
import Tree0 from './dragtree/DraggableTree'
import CustomTreeNode from './dragtree/CustomTreeNode.vue'

const Tree = {
  extends: Tree0,
  components: {
    TreeNode: CustomTreeNode,
  },
  data() {
    return {
      nodesTransition: 'fade',
    }
  },
}

export default {
  components: {Tree},
  data() {
    return {
      draggable: false,
      emptyData: [],
      originalData: [
        {text: '服务-1'},
        {text: '服务-2'},
        {text: '服务-3'},
        {text: '服务-4'},
        {text: '服务-5', droppable: false},
        {text: '服务-6', children: [
          {text: '服务-6-接口-1'},
          {text: '服务-6-子服务-1', children: [
            {text: '服务-6-子服务-1-接口-1'},
            {text: '服务-6-子服务-1-接口-2'},
          ]},
          {text: '服务-6-子服务-2', droppable: false, children: [
            {text: '服务-6-子服务-2-接口-1'},
            {text: '服务-6-子服务-2-接口-2'},
          ]},
          {text: '服务-6-子服务-3', children: [
            {text: '服务-6-子服务-3-接口-1'},
            {text: '服务-6-子服务-3-接口-2', droppable: false},
          ]},
          {text: '服务-6-接口-2'},
          {text: '服务-6-接口-3'},
          {text: '服务-6-接口-4'},
          {text: '服务-6-接口-5'},
          {text: '服务-6-接口-6'},
          {text: '服务-6-接口-7'},
          {text: '服务-6-接口-8'},
          {text: '服务-6-子服务-4', children: [
            {text: '服务-6-子服务-4-接口-1'},
            {text: '服务-6-子服务-4-接口-2'},
            {text: '服务-6-子服务-4-接口-3'},
            {text: '服务-6-子服务-4-接口-4'},
          ]},
        ]},
      ],
      data: null,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    tree1Change(node, targetTree) {
      this.data = targetTree.getPureData()
    },
    ondrag() {
      const tree = this.$refs.tree1
      tree.nodesTransition = null
    },
    ondrop() {
      const tree = this.$refs.tree1
      tree.nodesTransition = 'fade'
    },
  },
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
</style>
