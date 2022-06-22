import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const URL = "http://127.0.0.1:8000/api";
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    url: 'https://astrum.uubek.com',
    errors: null,
    error: null,
    token: null,
    user: null,
    stacks: null,
    walletHistory: null,
    orderHistory: null,
    receiveModal: false,
    sendModal: false,
    userModal: false,
    confirmLogout: false,
    openCheque: false,
    fio: ''
  },
  getters: {},
  mutations: {
    error(state, data) {
      if (data.errors) {
        state.errors = data.errors;
      } else {
        state.error = data.error;
      }
    },
    setToken(state, data) {
      state.token = data.token;
      localStorage.setItem("token", data.token);
    },
    setUser(state, user) {
      state.user = user;
    },
    setWalletHistory(state, history) {
      state.walletHistory = history;
    },
    setOrderHistory(state, history) {
      state.orderHistory = history;
    },
    setStack(state, stacks) {
      state.stacks = stacks
    },
    removeToken(state) {
      state.token = null;
      state.errors = null,
      state.error = null,
      state.user = null,
      state.stacks = null,
      state.walletHistory = null,
      state.receiveModal = false,
      state.sendModal = false,
      state.userModal = false,
      state.fio = ''
      localStorage.clear()
    },
    setCheckWallet(state, data) {
      state.fio = data.fio
    }
  },
  actions: {
    async login({ commit }, user) {
      try {
        const res = await axios.post(`${URL}/login`, user)
        commit("setToken", res.data);
      } catch (e) {
        commit("error", e.response.data);
        throw e;
      }
    },
    async logout({ commit }) {
      try {
        await axios.post(`${URL}/logout`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        commit('removeToken')
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async register({ commit }, user) {
      try {
        const res = await axios.post(`${URL}/register`, user)
        commit("setToken", res.data);
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async getStack({ commit }) {
      try {
        const res = await axios.get(`${URL}/stacks`)
        commit("setStack", res.data);
      } catch (e) {
        commit('error', err.response.data)
        throw e;
      }
    },
    async checkWallet({ commit }, address) {
      try {
        const res = await axios.post(`${URL}/wallet`, { address: address }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        commit('setCheckWallet', res.data)
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async transfer({ commit }, data) {
      try {
        await axios.post(`${URL}/wallet/transfer`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async updatePassword({ commit }, data) {
      try {
        await axios.post(`${URL}/user/password`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
      } catch (e) {
        commit('error', e.response.data)
        throw e
      }
    },
    async resetPassword({ commit }, email) {
      try {
        await axios.post(`${URL}/reset-password`, email)
      } catch (e) {
        commit('error', e.response.data)
        throw e
      }
    },
    async changePassword({ commit }, data) {
      try {
        await axios.post(`${URL}/reset-password/new`, data)
      } catch (e) {
        commit('error', e.response.data)
        throw e
      }
    },
    async getHistory({ commit }) {
      try {
        const res = await axios.get(`${URL}/transfers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        commit('setWalletHistory', res.data)
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async getOrders({ commit }) {
      try {
        const res = await axios.get(`${URL}/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        commit('setOrderHistory', res.data)
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async setPhoto({ commit }, data) {
      try {
        await axios.post(`${URL}/user/photo`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      } catch (e) {
        commit('error', e.response.data)
        throw e;
      }
    },
    async getUser({ commit }) {
      try {
        const res = await axios.get(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        commit('setUser', res.data)
      } catch (e) {
        if (e.response.status === 401) {
          commit('removeToken')
          window.location.href = '/login'
        }
        commit('error', e.response.data)
        throw e
      }
    }
  },
  modules: {},
});
