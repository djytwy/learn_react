import * as types from './types.js'

const mutations = {
    [types.LOGIN]: (state, data) => {
        state.token = data;
        window.localStorage.setItem('token', data);
    },
    [types.LOGOUT]: (state) => {
        state.token = null;
        window.localStorage.removeItem('token');
    },
    [types.USERNAME]: (state, data) => {
        //把用户名存起来
        state.username = data;
        window.localStorage.setItem('username', data);
    }
};

export default mutations;