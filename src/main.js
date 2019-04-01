import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import axios from 'axios'

import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ELEMENT)


Vue.config.productionTip = false

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$http = axios;

axios.defaults.withCredentials=true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
