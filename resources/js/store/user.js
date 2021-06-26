import axios from "axios";

let csrf = document.querySelector('meta[name="csrf"]').content;
let url = document.querySelector('meta[name="url"]').content;
const User = {
    namespaced: true,
    state: {
        loginError: {},
        isLogin: true,
        isRegisterLoading: true,
        registerError: {},
        isRegister: true,
        loginResp: false,
        registerResp: false,
        token: "",
        isAuth: false,
        user: {},
        logoutResp: false,
    },
    mutations: {
        SET_LOGIN_ERROR: (state, payload) => state.loginError = payload,
        SET_REGISTER_ERROR: (state, payload) => state.registerError = payload,
        SET_TOKEN: (state, payload) => { state.token = payload; localStorage.setItem('user', JSON.stringify(payload)) },
        SET_LOGIN_LOADING: (state, payload) => state.isLogin = payload,
        SET_REGISTER_LOADING: (state, payload) => state.isRegisterLoading = payload,
        SET_USER: (state, payload) => state.user = payload,
        SET_LOGOUT_RES: (state, payload) => state.logoutResp = payload,
        SET_LOGIN_RES: (state,payload) => state.loginResp = payload, 

    },
    actions: {
        async logIn({ commit }, data) {
            commit('SET_LOGIN_LOADING', true);
            data._token = csrf;
            await axios.post(`${url}/api/user/login`, data)
                .then((res) => {
                    commit('SET_LOGIN_LOADING', false)
                    if (res.data.success) {
                        commit('SET_USER', res.data.user);
                        commit('SET_TOKEN', res.data.token);
                    } else {
                        commit('SET_LOGIN_ERROR', res.data.errors)
                    }
                })
                .catch((err) => console.log(err));
        },
        async register({ commit }, data) {
            commit('SET_REGISTER_LOADING', true);
            data._token = csrf;
            await axios.post(`${url}/api/user/register`, data)
                .then((res) => {
                    commit('SET_REGISTER_LOADING', false)
                    commit('SET_LOGIN_RES',res.data.success);
                    if (res.data.success) {
                        commit('SET_USER', res.data.user);
                        commit('SET_TOKEN', res.data.token);
                    } else {
                        commit('SET_REGISTER_ERROR', res.data.errors)
                    }
                })
                .catch((err) => console.log(err));
        },
        async logout({ commit }, id) {
            await axios.delete(`${url}/api/logout/${id}`)
                .then((res) => commit('SET_LOGOUT_RES', res.data.success))
                .catch((err) => err)
        }
    },

}

export default User;