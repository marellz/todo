import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const endPoint = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    lists: [ ]
  },
  getters: {
    lists(state) {
      return state.lists
    }
  },
  mutations: {
    fetchLists(state, payload) {
      state.lists = payload.lists
    },
    toggleComplete(state, payload) {
      var task = state.lists[payload.list].tasks[payload.task]
      if (task.complete && task.complete == true) {
        task.complete = false
      } else {
        task.complete = true
      }
    },
    newList(state, payload) {
      var task = payload.created
      task.tasks = []
      state.lists.push(task)
    }
  },
  actions: {
    async getLists({ commit }) {
      const response = await axios.get(`${endPoint}/list`)
      commit('fetchLists', response.data)
    },
    async newList({commit},list){
      const response = await axios.post(`${endPoint}/list/new`,list)
      commit('newList',response.data)
    }
  },
  modules: {
  }
})
