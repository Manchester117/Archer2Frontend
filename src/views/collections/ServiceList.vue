<template>
  <v-card>
    <v-layout class="px-2 pb-2">
      <v-flex xs2>
        <v-btn color="primary">新增服务</v-btn>
      </v-flex>
      <v-spacer/>     <!-- 填充空白的区域 -->
      <v-flex xs4>
        <v-text-field label="搜索关键字" hide-details append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="services"
      :pagination.sync="pagination"
      :total-items="totalServices"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.serviceName }}</td>
        <td class="text-xs-center">{{ props.item.updateTime }}</td>
        <td class="text-xs-center">{{ props.item.serviceDomain }}</td>
        <td class="text-xs-center">{{ props.item.serviceDesc }}</td>
        <td class="text-xs-center">{{ props.item.creator }}</td>
        <td class="text-xs-center">
          <v-btn flat icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="green">
            <v-icon>settings</v-icon>
          </v-btn>
          <v-btn flat icon color="error">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        totalServices: 0,
        services: [],
        loading: true,
        rowsPerPageItems: [ 5, 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        pagination: {
          rowsPerPage: 10
        },
        headers: [
          { text: "服务名称", align: "center", sortable: false, value: "serviceName" },
          { text: "更新时间", align: "center", sortable: false, value: "updateTime" },
          { text: "服务域名", align: "center", sortable: false, value: "serviceDomain" },
          { text: "服务描述", align: "center", sortable: false, value: "serviceDesc" },
          { text: "创建者", align: "center", sortable: false, value: "creator" },
          { text: "操作", align: "center", sortable: false }
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.projects = data.items
              this.totalProjects = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.projects = data.items
          this.totalProjects = data.total
        })
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getServices()
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      getServices () {
        this.services = [
          {
            serviceName: '简历接口服务',
            updateTime: new Date().toLocaleDateString(),
            serviceDomain: 'resumeapi.xxxx.cn',
            serviceDesc: '简历接口服务',
            creator: 'xxxx'
          },
          {
            serviceName: '搜索服务',
            updateTime: new Date().toLocaleDateString(),
            serviceDomain: 'data.xxxx.cn',
            serviceDesc: '搜索服务',
            creator: 'xxxx'
          },
          {
            serviceName: 'webapi',
            updateTime: new Date().toLocaleDateString(),
            serviceDomain: 'webapi.xxxx.cn',
            serviceDesc: '各端controller层调用',
            creator: 'xxxx'
          },
          {
            serviceName: '活动调用',
            updateTime: new Date().toLocaleDateString(),
            serviceDomain: 'activeapi.xxxx.cn',
            serviceDesc: '各端controller层调用',
            creator: 'xxxx'
          }
        ],
        this.totalServices = 15
      }
    }
  }
</script>