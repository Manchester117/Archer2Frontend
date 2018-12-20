import Vue from 'vue'
import Vuetify from 'vuetify'                                             // 引入Vuetify
import HappyScroll from 'vue-happy-scroll'                                // 引入Vue的滚动条
import Vddl from 'vddl'

import './plugins/vuetify'                                                // 引入Vuetify的插件
import 'vuetify/dist/vuetify.min.css'                                     // 引入vuetify的css样式
import 'vue-happy-scroll/docs/happy-scroll.css'                           // 引入滚动条的样式
import 'material-design-icons-iconfont/dist/material-design-icons.css'    // 如果Icon未显示,需要安装和导入material-design-icons.css
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.use(Vuetify)
Vue.use(HappyScroll)
Vue.use(Vddl)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')