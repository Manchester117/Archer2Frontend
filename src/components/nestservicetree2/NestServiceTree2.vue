<template>
  <v-layout row wrap class="pa-3">
    <v-flex xs5>
      <!-- overflow-y:scroll 增加滚动条 -->
      <v-card class="panel" height="845px" style="overflow-y:scroll" expand>
        <div class="panel__heading">
          <h3>Service-Interface-Collection</h3>
        </div>
        <div class="panel__body">
          <vddl-list class="panel__body--list"
            :list="serviceCollection"
            :inserted="inserted"
            effect-allowed="copy"
            :disable-if="disable"
            :external-sources="true"
            :allowed-types="allowedTypesForTree">
            <list v-for="(item, index) in serviceCollection"
              :key="item.id"
              :item="item"
              :list="serviceCollection"
              :index="index"
              :selected="handleSelected"
              :selected-item="selectedItem"
              :disable="disable">
            </list>
          </vddl-list>
        </div>
      </v-card>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs5>
      <v-card class="panel" height="845px" style="overflow-y:scroll">
        <div class="panel__heading">
          <h3>Interface Sequence</h3>
        </div>
        <div class="panel__body">
          <vddl-list class="panel__body--list"
              :list="interfaceList"
              :inserted="handleInserted"
              :dragover="handleDragover"
              :drop="handleDrop"
              :horizontal="false"
              :allowed-types="allowedTypesForList"
              style="height: 845px">
            <vddl-draggable class="panel__body--item" v-for="(item, index) in interfaceList" :key="item.id"
              :draggable="item"
              :index="index"
              :wrapper="interfaceList"
              effect-allowed="move"
              :type="item.type"
              :selected="selectedEvent"
              :dragstart="handleDragstart"
              :dragend="handleDragend"
              :canceled="handleCanceled"
              :moved="handleMoved"
              v-bind:class="{'selected': selected === item}">
              {{item.type}}&nbsp;{{item.id}}
            </vddl-draggable>
            <!-- 去掉自定义占位符,防止无法正常添加item -->
            <!-- <vddl-placeholder class="red">Custom placeholder</vddl-placeholder> -->
          </vddl-list>
        </div>
      </v-card>
    </v-flex>
    <v-flex d-flex>
      <v-card class="ashcan" height="845px">
        <div class="panel panel--info">
          <div class="panel__heading">
            <h3>Trash</h3>
          </div>
          <vddl-list :list="[]" class="panel__body">
            <img class="ashcan-logo" src="../../assets/ashcan.png" alt="" />
          </vddl-list>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import list from './NestedList2.vue';

export default {
  data() {
    return {
      interfaceList: [],
      selected: null,
      allowedTypesForList: [
        "item"
      ],

      selectedItem: null,
      disable: false,
      allowedTypesForTree: [],
      serviceCollection: [
        {
          "type": "item",
          "id": 7
        },
        {
          "type": "item",
          "id": "8"
        },
        {
          "type": "container",
          "id": "2",
          "columns": [
            {
              "type": "item",
              "id": "9"
            },
            {
              "type": "item",
              "id": "10"
            },
            {
              "type": "container",
              "id": "3",
              "columns": [
                {
                  "type": "item",
                  "id": "13"
                },
                {
                  "type": "item",
                  "id": "14"
                },
                {
                  "type": "container",
                  "id": "4",
                  "columns": [
                    {
                      "type": "item",
                      "id": "15"
                    },
                    {
                      "type": "item",
                      "id": "16"
                    },
                    {
                      "type": "item",
                      "id": "17"
                    },
                    {
                      "type": "item",
                      "id": "18"
                    },
                    {
                      "type": "item",
                      "id": "19"
                    }
                  ]
                }
              ]
            },
            {
              "type": "item",
              "id": "20"
            },
            {
              "type": "item",
              "id": "21"
            },
            {
              "type": "item",
              "id": "22"
            },
            {
              "type": "item",
              "id": "23"
            },
            {
              "type": "item",
              "id": "24"
            },
            {
              "type": "item",
              "id": "25"
            }
          ]
        }
      ]
    }
  },
  methods: {
    // NestTree的方法
    copied(item){
      item.id++;
    },
    inserted(data){
      console.log(data);
    },
    toggleDisable() {
      this.disable = !this.disable;
    },
    handleSelected(item) {
      this.selectedItem = item;
    },

    // List的方法
    selectedEvent: function(item){
      this.selected = item;
    },
    handleDragstart() {
      console.log(':v-draggable: dragstart');
    },
    handleDragend() {
      console.log(':v-draggable: dragend');
    },
    handleCanceled() {
      console.log(':v-draggable: canceled');
    },
    handleInserted() {
      console.log(':v-list: inserted');
    },
    handleDrop(data) {
      console.log(':v-list: drop');
      console.log(data);
      const { index, list, item } = data;
      // change the id
      item.id = new Date().getTime();
      list.splice(index, 0, item);
    },
    handleMoved(item) {
      console.log(':v-draggable: moved');
      console.log(item);
      const { index, list } = item;
      list.splice(index, 1);
    },
    handleDragover() {
      console.log(':v-list: handleDragover');
    },
  },
  components: {
    list
  }
}
</script>

<style lang="less">
.ashcan{
  .ashcan-logo{
    display: block;
    width: 40px;
    margin: 10px auto;
  }
  .vddl-placeholder {
    display: none;
  }
}
</style>