import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: login
    },{
      path:'/home',
      name:'home',
      meta:{
        requireAuth:true
      },
      component:home
    }
  ]
})
