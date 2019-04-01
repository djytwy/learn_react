import axios from 'axios'
import store from './store.js'
import router from './router.js'

// 设置axios全局默认值
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;


//request拦截器
instance.interceptors.request.use(
    config => {
        //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
        if(store.state.token){
            config.headers.Authorization = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLoginout'); //可能是token过期，清除它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response);
    }
);

class User {

    static home(){
        return instance.get('/api/init')
    }
    
    static register(data){
        return instance.post('/api/register', data)
    }

    static login(data){
        return instance.post('/api/login', data)
    }

    static find_user(data){
        return instance.post('/api/find_user',data)
    }

    static login_out(token){
        return instance.get('/api/login_out',{
            params: {
                token:token
            }
        })
    }
}


export default User