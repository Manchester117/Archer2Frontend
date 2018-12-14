import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'                                     // 引入vuetify的css样式
import 'material-design-icons-iconfont/dist/material-design-icons.css'    // 如果Icon未显示,需要安装和导入material-design-icons.css
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')