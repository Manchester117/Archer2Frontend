<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs8>
        <v-layout row wrap>
          <v-flex xs6>
            <collapsing-animation></collapsing-animation>
          </v-flex>
          <v-flex xs6>
            <empty></empty>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
          <div>
            <div class="headline mb-0">Dev Interface Sequence Flow</div>
            <div>Coming Soon ...</div>
            <div>Coming Soon ...</div>
            <div>Coming Soon ...</div>
            <div>Coming Soon ...</div>
          </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="cyan">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import BaseTree from '@/examples/Base'
// import MaxLevelTree from '@/examples/MaxLevel'
import CollapsingAnimation from '../../components/CollapsingAnimation'
import Empty from '../../components/Empty'

export default {
  components: {CollapsingAnimation, Empty},
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
#app{
  display: flex;
}
.mr{
  margin-right: 1em;
}
// ===============
.he-tree{
  padding: 5px;
  height: 815px;          // 
}
.tree-node{
  width: 370px;           // 控制每个节点的宽度
}
.tree-node-inner{
  cursor: pointer;
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
