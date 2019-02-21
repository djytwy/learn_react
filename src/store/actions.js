import * as types from './types.js'

//actions常用于异步更改状态。也就是说它一般用来先发送请求，然后再commit
//直接在页面发送请求后再store.commit()是完全可以的

export default {
    UserLogin({ commit }, data){
        commit(types.LOGIN, data);
    },
    UserLoginout({ commit }){
        commit(types.LOGOUT);
    },
    UserName({ commit }, data){
        commit(types.USERNAME, data);
    }
}