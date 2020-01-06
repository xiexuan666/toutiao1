// 先引入vue
import Vue from 'vue'
// 在引入vue-router
import VueRouter from 'vue-router'
import login from '@/view/login'
// 然后在挂载在use
Vue.use(VueRouter)
// 创建一个路由
let router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: login
  }]
})
// 然后暴露出去
export default router
