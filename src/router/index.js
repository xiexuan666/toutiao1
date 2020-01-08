// 先引入vue
import Vue from 'vue'
// 在引入vue-router
import VueRouter from 'vue-router'
// 引入组件  在底下做映射
import login from '@/view/login.vue'
import personal from '@/view/personal.vue'
import editPersonal from '@/view/editPersonal.vue'
// 然后在挂载在use
Vue.use(VueRouter)
// 创建一个路由
let router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'personal',
    path: '/personal/:id',
    component: personal
  },
  {
    name: 'editPersonal',
    path: '/editPersonal/:id',
    component: editPersonal

  }
  ]
})
// 添加导航守卫:前置守卫：在跳转之前进行调用
// 所有路由跳转请求都会经过这个导航守卫
// to:目标路由
// from:源路由
// next:下一步的操作，就是用户当前需要进行的操作
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    // 如果用户登录过，则进行路由的跳转，否则重定向到登录页
    let token = localStorage.getItem('token')
    if (token) { // 如果有token说明你登录过了
      next()
    } else {
      // 如果是访问需要授权的页面且没有登陆过，则重定向到登陆页
      name({ name: '/login' })
    }
  } else {
    next()
  }
})
// 然后暴露出去
export default router
