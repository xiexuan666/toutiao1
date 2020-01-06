import Vue from 'vue'
import router from '@/router/index.js'
import App from './App'
// 引入vant框架全局
import { Button, Toast } from 'vant'
Vue.use(Button)
  .use(Toast)

// import Vant from 'vant'
// import 'vant/lib/index.css'
// 设置当前的开发阶段
Vue.config.productionTip = false
// Vue.use(Vant);
new Vue({
  // 渲染组件到页面
  router,
  render: h => h(App)
}).$mount('#app')
