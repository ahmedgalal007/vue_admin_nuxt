export const state = () => ({
    USER_TASKS:[],
    GROUPS_TASKS:[]

  })
  export const actions = {
    async getUserTasks({ state, commit, dispatch, $axios }, isAuthenticated) {
        const api = "http://api.akhbarelyom.com/User/GetTasks";
        const userTasks = await $axios.$get(api);
        commit('setUserTasks', userTasks)
    }, 

  }
  export const getters = {

  }
  export const mutations = {
    setUserTasks(state, userTasks){
        state.USER_TASKS = [...userTasks]
    }
  }
  