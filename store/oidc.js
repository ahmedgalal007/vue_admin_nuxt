export const state = () => ({
  isAuthenticated: false,
})
export const actions = {}
export const getters = {}
export const mutations = {
  SET_IS_AUTHENTICATED: (state, isAuthenticated) => {
    state.isAuthenticated = isAuthenticated
  },
}
