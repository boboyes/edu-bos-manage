import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // JSON.parse 只接收字符串类型，getItem可能为null
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 持久化存储
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
