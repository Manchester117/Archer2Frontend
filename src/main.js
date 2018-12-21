import Vue from 'vue'
import Vuetify from 'vuetify'                                             // 引入Vuetify
import Vddl from 'vddl'

import './plugins/vuetify'                                                // 引入Vuetify的插件
import 'vuetify/dist/vuetify.min.css'                                     // 引入Vuetify的css样式
import 'mdui/dist/css/mdui.min.css'                                       // 引入Mdui的css样式
import 'material-design-icons-iconfont/dist/material-design-icons.css'    // 如果Icon未显示,需要安装和导入material-design-icons.css
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.use(Vuetify)
Vue.use(Vddl)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')