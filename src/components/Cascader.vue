<template>
  <v-layout class="px-2 py-2">
    <v-select
      v-model="UnitList.select"
      :hint="`${UnitList.select.name}, ${UnitList.select.id}`"
      :items="UnitList.items"
      item-text="name"
      item-value="id"
      label="项目"
      persistent-hint
      return-object
      hide-details=true
      class="px-1"
      dense
    ></v-select>
    <v-select
      v-model="DepartmentList.select"
      :hint="`${DepartmentList.select.name}, ${DepartmentList.select.id}`"
      :items="DepartmentList.items"
      item-text="name"
      item-value="id"
      label="服务"
      persistent-hint
      return-object
      hide-details="true"
      class="px-1"
      dense
    ></v-select>
    <v-select
      :items="UserList"
      label="接口"
      class="px-1"
    ></v-select>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        UnitSelected: "",
        UnitList: [],
        DepartmentSelected: "",
        DepartmentList: [],
        UserSelected: "",
        UserList: []
      }
    },
    watch: {
      UnitSelected: function (val) {
          this.DepartmentList = this.DepartmentList.filter(function (element) { return element.pid == val });
          this.DepartmentSelected = this.DepartmentList.length > 0 ? this.DepartmentList[0].id : "--";
      },
      DepartmentSelected: function (val) {
          this.UserList = this.UserList.filter(function (element){ return element.pid == val});
          this.UserSelected = this.UserList.length > 0 ? this.UserList[0].id : "--";
      }
    },
    mounted() {
      let unitList = this.getProjectData().UnitList
      let departmentList = this.getProjectData().DepartmentList
      let userList = this.getProjectData().userList
      
      this.UnitList = unitList
      this.UnitSelected = unitList.length > 0 ? UnitList[0].id : "--";

      let unitId = this.UnitSelected;
      this.DepartmentList = departmentList.filter(function (element) { return element.pid == unitId });
      this.DepartmentSelected = departmentList.length > 0 ? departmentList[0].id : "--";

      let departId = this.DepartmentSelected;
      this.UserList = userList.filter(function (element){ return element.pid == departId});
      this.UserSelected = userList.length > 0 ? userList[0].id : "--";
    },
    methods: {
      getProjectData() {
        this.UnitList = {
          select: { name: "--", id:"--" },
          items: [
            { name: "小程序", id: "1" },
            { name: "B端项目", id: "2" },
          ]
        },
        this.DepartmentList = {
          select: { name: "--", id: "--", pid: '--' },
          items: [
            { name:"服务1", id:"1", pid:"1" },
            { name:"服务2", id:"2", pid:"1" },
            { name:"服务3", id:"3", pid:"2" },
            { name:"服务4", id:"4", pid:"2" }
          ]
        },
        this.UserList = [
          {name:"111", id:"1", pid:"1"},
          {name:"112", id:"2", pid:"1"},
          {name:"121", id:"3", pid:"2"},
          {name:"122", id:"4", pid:"2"},
          {name:"211", id:"5", pid:"3"},
          {name:"212", id:"6", pid:"3"},
          {name:"221", id:"7", pid:"4"},
          {name:"222", id:"8", pid:"4"}
        ]
      }
    }
  }
</script>
