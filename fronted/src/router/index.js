import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/pages/home'
import store from '../store/index.js'

Vue.use(Router)

// 路由懒加载
const Home = resolve => {
  require.ensure(['../components/home.vue'], () => {
    resolve(require('../components/home.vue'))
  })
}

const Login 

const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      meta:{ 
        requireAuth: true
      }
    },
    {
      path:'login',
      name:'login',
    }
  ]
})


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
