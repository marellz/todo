import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const endPoint = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    lists: [],
    list: {},
  },
  getters: {
    lists: (state) => state.lists,
    list: (state) => state.list
  },

  mutations: {

    // lists

    fetchLists(state, payload) {
      state.lists = payload.lists
    },

    fetchList(state, payload) {
      state.list = payload.list
    },

    clearList(state) {
      state.list = []
    },

    newList(state, payload) {
      var task = payload.created
      task.tasks = []
      state.lists.push(task)
    },

    updateList(state, payload) {
      state.list = payload.list
    },

    deleteList(state, list) {
      state.lists.splice(state.lists.indexOf(list), 1)
      state.list = null
    },

    // tasks

    createTask(state, payload) {
      if (!state.list.tasks) {
        state.list.tasks = []
      }
      state.list.tasks.push(payload.task)
    },

    updateTask(state, payload) {
      state.list.tasks[payload.index].complete = payload.complete
    },

    deleteTask(state, payload) {
      state.lists[payload.listIndex].tasks.splice(payload.taskIndex, 1)
    }
  },
  actions: {
    async getLists({ commit }) {
      const response = await axios.get(`${endPoint}/list`)
      commit('fetchLists', response.data)
    },
    async getList({ commit }, id) {
      const response = await axios.get(`${endPoint}/list/show/${id}`)
      commit('fetchList', response.data)
    },
    async newList({ commit }, list) {
      const response = await axios.post(`${endPoint}/list/new`, list)
      commit('newList', response.data)
    },
    async updateList({ commit }, id) {
      const response = await axios.post(`${endPoint}/list/update/${id}`)
      commit('updateList', response.data)
    },
    async deleteList({ commit }, list) {
      const response = await axios.get(`${endPoint}/list/delete/${list.id}`)
      if (response.deleted) {
        commit('deleteList', list)
      } else {
        console.log('delete failed');
      }
    },


    // tasks
    async createTask({ commit }, task) {
      const response = await axios.post(`${endPoint}/task/new`, task)
      commit('createTask', response.data)
    },

    async updateTask({ commit }, task) {
      const response = await axios.post(`${endPoint}/task/update/${task.id}`, { complete: task.complete })
      commit('updateTask', { response:response.data.updated, complete:task.complete, index: task.index })
    },

  },
  modules: {
  }
})
