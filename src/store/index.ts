import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload ? payload.user : null
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload)
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
  modules: {},
})
