// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import {Button,Row,Input,Dialog,MessageBox,Form,FormItem} from 'element-ui';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Row);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$http = axios

axios.defaults.withCredentials=true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
