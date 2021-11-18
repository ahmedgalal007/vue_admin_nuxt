export const state = () => ({
  snackbars: new Array(5),
})

export const getters = {
  getSnackbar(state) {
    return state.snackbars
  },
}
export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    // state.snackbars = state.snackbars.concat(snackbar)
    state.snackbars = state.snackbars.concat([snackbar])
    // state.snackbars = JSON.parse(
    //   JSON.stringify(state.snackbars.concat(snackbar))
    // )
  },
  CLOSE_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.map((bar) => {
      const newbar = { ...bar }
      if (bar.index === snackbar.index) newbar.showing = false
      return newbar
    })
  },
}

export const actions = {
  setSnackbar({ state, commit, dispatch }, snackbar) {
    // state.snackbars.push(snackbar)
    snackbar.index = state.snackbars.length
    commit('SET_SNACKBAR', snackbar)
    setTimeout(() => {
      commit('CLOSE_SNACKBAR', { ...snackbar })
    }, snackbar.timeout)
  },
  closeSnackbar({ commit }, snackbar) {
    commit('CLOSE_SNACKBAR', { ...snackbar })
  },
}
