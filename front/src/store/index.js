import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {
        title: "Trip to Paris",
        bg: '#3A2B85ff',
        tasks: [
          { name: "Pack bags", complete:false},
          { name: "Get VISA", complete: true },
          { name: "Buy Camera", complete: false},
          { name: "Book AirBnB", complete: false}
        ]
      },
      {
        title: "My Tasks",
        bg: '#E03535ff',
        tasks: [
          { name: 'Complete To-Do App', complete:false}
        ]
      }
    ]
  },
  getters:{
    lists(state){
      return state.lists
    }
  },
  mutations: {
    toggleComplete(state,payload){
      var task = state.lists[payload.list].tasks[payload.task]
      if(task.complete && task.complete == true){
        task.complete =  false
      } else {
        task.complete = true
      }
      // var complete = typeof task.complete == 'boolean' && task.complete == true
      // task.complete = !complete      
    },
    newList(state, payload){
      state.lists.push(
        {
          title: payload.name,
          bg: '#E03535ff',
          tasks: [
          ]
        }
      )
    }
  },
  actions: {

  },
  modules: {
  }
})
