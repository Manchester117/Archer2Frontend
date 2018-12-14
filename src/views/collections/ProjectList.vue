<template>
  <v-card>
    <v-layout class="px-2 pb-2">
      <v-flex xs2 class="pt-2">
        <v-btn color="primary">新增项目</v-btn>
      </v-flex>
      <cascader></cascader>
      <v-spacer/>     <!-- 填充空白的区域 -->
      <v-flex xs4 class="pt-2">
        <v-text-field label="搜索关键字" hide-details append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="projects"
      :pagination.sync="pagination"
      :total-items="totalProjects"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.projectName }}</td>
        <td class="text-xs-center">{{ props.item.updateTime }}</td>
        <td class="text-xs-center">{{ props.item.projectDesc }}</td>
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
  import cascader from '../../components/Cascader.vue'

  export default {
    components: {cascader},
    data () {
      return {
        totalProjects: 0,
        projects: [],
        loading: true,
        rowsPerPageItems: [ 5, 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        pagination: {
          rowsPerPage: 10
        },
        headers: [
          { text: "项目名称", align: "center", sortable: false, value: "projectName" },
          { text: "更新时间", align: "center", sortable: false, value: "updateTime" },
          { text: "项目描述", align: "center", sortable: false, value: "projectDesc" },
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

          let items = this.getProjects()
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
      getProjects () {
        this.projects = [
          {
            projectName: '小程序',
            updateTime: new Date().toLocaleDateString(),
            projectDesc: '小程序全部Controller',
            creator: 'xxxx'
          },
          {
            projectName: 'hr.highpin.cn',
            updateTime: new Date().toLocaleDateString(),
            projectDesc: 'B端全部Controller',
            creator: 'xxxx'
          },
          {
            projectName: 'h.highpin.cn',
            updateTime: new Date().toLocaleDateString(),
            projectDesc: 'h端全部Controller',
            creator: 'xxxx'
          },
          {
            projectName: 'c.highpin.cn',
            updateTime: new Date().toLocaleDateString(),
            projectDesc: 'c端全部Controller',
            creator: 'xxxx'
          }
        ],
        this.totalProjects = 15
      }
    }
  }
</script>