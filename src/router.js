import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'       // 引入Vuetify的Layout组件

Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('./views' + file)
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',      // 根路径,路由到Layout组件
      name: 'Layout',
      component: Layout,
      redirect: "/collections/projectList",
      children: [
        route("/collections/projectList", "/collections/ProjectList", "ProjectList"),
        route("/collections/serviceList", "/collections/ServiceList", "ServiceList"),
        route("/collections/apiList", "/collections/ApiList", "ApiList"),
        route("/collections/globalApiList", "/collections/GlobalApiList", "GlobalApiList"),
        route("/dnsConfig/dnsList", "/dnsConfig/DnsList", "DnsList"),
        route("/testFlows/processList", "/testFlows/ProcessList", "ProcessList"),
        route("/testFlows/historyList", "/testFlows/HistoryList", "HistoryList"),
        route("/testFlows/scheduleList", "/testFlows/ScheduleList", "ScheduleList")
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
