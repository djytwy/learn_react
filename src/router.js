import Router from 'vue-router'
import store from './store.js'
import Vue from 'vue'

Vue.use(Router)

// 路由懒加载
const Home = resolve => {
  	require.ensure(['./views/home.vue'], () => {
    	resolve(require('./views/home.vue'))
  	})
}

const Login = resolve => {
  	require.ensure(['./components/login.vue'], () => {
    	resolve(require('./components/login.vue'))
  	})
}

const Line = resolve => {
  	require.ensure(['./views/showLineCharts.vue'], () => {
    	resolve(require('./views/showLineCharts.vue'))
  	})
}

const Rose = resolve => {
  	require.ensure(['./views/showRoseCharts.vue'], () => {
    	resolve(require('./views/showRoseCharts.vue'))
  	})
}

const test = resolve => {
	require.ensure(['./components/test.vue'], () => {
		resolve(ensure('./components/test.vue'))
	})
}

const router = new Router({
  	mode:'history',
  	routes:[{
		path:'/',
		name:'home',
		component:Home,
		meta:{ 
			requireAuth: true
		}
	},{
		path:'/login',
		name:'login',
		component:Login,
		meta:{
			loginCheck: true
		}
    },{
		path:'/test',
		name:"test",
		component:test
	},{
		path:'/Line',
		name:'Line',
		component:Line
	},{
		path:'/Rose',
		name:'Rose',
		component:Rose
	}
  ]
})


//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  } else if (to.meta.loginCheck) {
    if(token) {
      next({
        path:'/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    } 
  } else {
    next();//如果无需token,那么随它去吧
  }
});

export default router;
