const state = {
    // 刷新无需重新登录
    token: window.sessionStorage.getItem('token'),
    userEmail: ''
};

const actions = {
    UserLogin({ commit }, data) {
        commit('login', data);
    },
    UserLogout({ commit }) {
        commit('logout');
    },
    SetUserEmail({ commit }, data) {
        commit('set_userEmail', data);
    }
};

const mutations = {
    login: (state, data) => {
        // 更改token值
        state.token = data;
        window.sessionStorage.setItem('token', data);
    },
    logout: (state) => {
        // 登出时清除token
        state.token = null;
        window.sessionStorage.removeItem('token');
    },
    set_userEmail: (state, data) => {
        // 把用户名保存起来
        state.userEmail = data;
        window.sessionStorage.setItem('userEmail', data);
    }
};

export default {
    state,
    actions,
    mutations
};