<template>
  <div>
    <v-layout class="px-2 pb-2">
      <v-flex xs2>
        <v-btn color="primary">新增接口</v-btn>
      </v-flex>
      <v-spacer/>     <!-- 填充空白的区域 -->
      <v-flex xs4>
        <v-text-field label="搜索关键字" hide-details append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="apis"
      :pagination.sync="pagination"
      :total-items="totalApis"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.apiName }}</td>
        <td class="text-xs-center">{{ props.item.updateTime }}</td>
        <td class="text-xs-center">{{ props.item.apiURL }}</td>
        <td class="text-xs-center">{{ props.item.method }}</td>
        <td class="text-xs-center">{{ props.item.belongService }}</td>
        <td class="text-xs-center">{{ props.item.creator }}</td>
        <td class="text-xs-center">
          <v-btn flat icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="error">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalApis: 0,
        apis: [],
        loading: true,
        pagination: {
          rowsPerPage: 10
        },
        rowsPerPageItems: [ 5, 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        headers: [
          { text: "接口名称", align: "center", sortable: false, value: "apiName" },
          { text: "更新时间", align: "center", sortable: false, value: "updateTime" },
          { text: "接口URL", align: "center", sortable: false, value: "apiURL" },
          { text: "请求方式", align: "center", sortable: false, value: "method" },
          { text: "所属服务", align: "center", sortable: false, value: "belongService" },
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
              this.desserts = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts()
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
      getDesserts () {
        this.apis = [
          {
            apiName: "搜猎头",
            updateTime: new Date().toLocaleDateString(),
            apiURL: '/api/HunterSearch/Search',
            method: 'GET',
            belongService: '搜索服务',
            creator: 'xxxx',
          },
          {
            apiName: "派单页",
            updateTime: new Date().toLocaleDateString(),
            apiURL: '/InterviewDispatch/InterviewDispatchCreateOrder',
            method: 'GET',
            belongService: '派单服务',
            creator: 'xxxx',
          }
        ],
        this.totalApis = 15
      }
    }
  }
</script>