export const state = () => ({
  isAuthenticated: false,
  user: null,
})
export const actions = {
  setIsAuthenticated({ state, commit, dispatch }, isAuthenticated) {
    commit('SET_IS_AUTHENTICATED', isAuthenticated)
  },
  setUser({ state, commit, dispatch }, user) {
    commit('SET_USER', user)
  },
}
export const getters = {
  getIsAuthenticated: (state) => {
    return state.isAuthenticated
  },
  getUser: (state) => {
    return state.user
  },
}
export const mutations = {
  SET_IS_AUTHENTICATED: (state, isAuthenticated) => {
    state.isAuthenticated = isAuthenticated
  },
  SET_USER(state, user) {
    state.user = { ...user }
  },
}
