// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';

// import axios from 'axios';
import store from './store'

Vue.config.productionTip = false

// 部署生产环境时候，这里可以注释掉，在webpack里面external掉 ElementUI、Vue等相应的部分，可大大减小vendor文件的大小
// import ElementUI from 'element-ui';
// import Vue from 'vue'
// Vue.use(ElementUI)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$http = axios;

axios.defaults.withCredentials=true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
