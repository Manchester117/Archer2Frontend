<template>
  <v-layout class="px-2 py-2">
    <v-select
      v-model="projectSelected"
      :hint="`${projectData.select.name}, ${projectData.select.id}`"
      :items="projectData.items"
      item-text="name"
      item-value="id"
      label="项目"
      persistent-hint
      return-object
      hide-details
      class="px-1"
      dense
      small-chips
    ></v-select>
    <v-select
      v-model="serviceSelected"
      :hint="`${serviceData.select.name}, ${serviceData.select.id}`"
      :items="serviceData.items"
      item-text="name"
      item-value="id"
      label="服务"
      persistent-hint
      return-object
      hide-details
      class="px-1"
      dense
      small-chips
    ></v-select>
    <v-select
      v-model="apiSelected"
      :hint="`${apiData.select.name}, ${apiData.select.id}`"
      :items="apiData.items"
      item-text="name"
      item-value="id"
      label="接口"
      persistent-hint
      return-object
      hide-details
      class="px-1"
      dense
      small-chips
    ></v-select>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        projectSelected: {},      // 被选中的项目
        projectData: {},          // 当前项目列表
        originProjectData: {},    // 全部项目列表
        
        serviceSelected: {},      // 被选中的服务
        serviceData: {},          // 当前服务列表
        originServiceData: {},    // 全部服务列表

        apiSelected: {},          // 被选中的接口
        apiData: {},              // 当前接口列表
        originApiData: {},        // 全部接口列表
      }
    },
    watch: {
      // 监控项目下拉框
      projectSelected: function (val) {
        // 使用当前选择到的项目id,对服务列表进行过滤,拿到该项目下的所有服务
        this.serviceData.items = this.serviceOriginData.items.filter(function (item) { return item.pid == val.id })
        // 将当前的服务列表的值置为第一个服务(空的-默认当前项目下的所有服务)
        this.serviceSelected = this.serviceData.items[0]
      },
      serviceSelected: function (val) {
        // 使用当前选择到的服务id,对接口列表进行过滤,拿到该服务下的所有接口
        this.apiData.items = this.apiOriginData.items.filter(function (item){ return item.pid == val.id })
        // 将当前的接口列表的值职位第一个接口(空的-默认当前服务下的所有接口)
        this.apiSelected = this.apiData.items[0]
      }
    },
    created() {
      this.getProjectData()
      this.getServiceData()
      this.getApiData()

      this.initMenu()
    },
    methods: {
      // 获取项目名称-ID
      getProjectData: function() {
        this.projectData = {
          select: { name: "---", id:"0" },
          items: [
            { name: "---", id:"0" },
            { name: "项目-1", id: "1" },
            { name: "项目-2", id: "2" },
          ]
        },
        // 借助JSON进行深度复制,保留全部数据
        this.projectOriginData = JSON.parse(JSON.stringify(this.projectData))
      },
      // 获取服务名称-ID-关联项目ID
      getServiceData: function() {
        this.serviceData = {
          select: { name: "---", id: "0", pid: '0' },
          items: [
            { name: "---", id: "0", pid: '0' },
            { name: "项目1-服务1", id: "1", pid: "1" },
            { name: "项目1-服务2", id: "2", pid: "1" },
            { name: "项目2-服务1", id: "3", pid: "2" },
            { name: "项目2-服务2", id: "4", pid: "2" }
          ]
        },
        this.serviceOriginData = JSON.parse(JSON.stringify(this.serviceData))
      },
      // 获取接口名称-ID-关联服务ID
      getApiData: function() {
        this.apiData = {
          select: { name: "---", id: "0", pid: '0' },
          items: [
            { name: "---", id: "0", pid: '0' },
            { name: "项目1-服务1-接口1", id: "1", pid: "1" },
            { name: "项目1-服务1-接口2", id: "2", pid: "1" },
            { name: "项目1-服务2-接口1", id: "3", pid: "2" },
            { name: "项目1-服务2-接口2", id: "4", pid: "2" },
            { name: "项目2-服务1-接口1", id: "5", pid: "3" },
            { name: "项目2-服务1-接口2", id: "6", pid: "3" },
            { name: "项目2-服务2-接口1", id: "7", pid: "4" },
            { name: "项目2-服务2-接口2", id: "8", pid: "4" }
          ]
        },
        this.apiOriginData = JSON.parse(JSON.stringify(this.apiData))
      },
      initMenu: function() {
        // 首先拿到项目列表
        let projectList = this.projectOriginData.items
        // 拿到列表中的第一个项目(空项目)
        this.projectSelected = this.projectData.select

        // 使用空项目的id对服务的列表进行过滤,拿到一个空服务列表
        let project = this.projectSelected
        let serviceList = this.serviceOriginData.items.filter(function (item) { return item.pid == project.id })
        // 将空服务列表插入到serviceData当中
        this.serviceData.items = serviceList
        // 从serviceData当中拿到第一个空的服务(初始化服务列表)
        this.serviceSelected = this.serviceData.select

        // 使用空服务的id对接口列表进行过滤,拿到一个空的接口列表
        let service = this.serviceSelected
        let apiList = this.apiOriginData.items.filter(function (item) { return item.pid == service.id })
        // 将空接口列表插入到apiData当中
        this.apiData.items = apiList
        // 从apiData当中拿到第一个空的接口(初始化接口列表)
        this.apiSelected = this.apiData.select
      }
    }
  }
</script>
