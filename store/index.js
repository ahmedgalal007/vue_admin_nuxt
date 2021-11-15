export const state = () => ({
  language: 'en',
  isLoading: false,
  snackbar: { opened: false, text: '', timeout: 2000 },
  // auth: { loggedIn: true, user: { id: '123abc', name: 'Ahmed Galal' } },
})

export const mutations = {
  /**
  * ! If the action nuxtServerInit is defined in the store and the mode is universal, 
  * ! Nuxt will call it with the context (only from the server-side). 
  * ! It's useful when we have some data on the server we want to give directly to the client-side.

  * * For example, let's say we have sessions on the server-side 
  * * and we can access the connected user through req.session.user. 
  * * To add the authenticated user to our store, we update our store/index.js to the following:
   */
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  },
  /**
   * Set the Application isLoading state
   * @param {*} state
   * @param {boolean} IsEnabled
   */
  SET_LOADING(state, IsEnabled) {
    state.isLoading = IsEnabled
  },
  /**
   * Set the Application isLoading state
   * @param {*} state
   * @param {string} lang
   */
  SET_LANGUAGE(state, lang) {
    state.language = lang
  },
  /**
   *
   * @param {*} state
   * @param {{opened:boolean,text:string,timeout:number}} snackbar
   */
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = { ...snackbar }
  },
}

export const actions = {
  // ! Passing context object {state, commit, dispatch }
  setLoading({ state, commit, dispatch }, Enabled) {
    commit('SET_LOADING', Enabled)
  },
  setSnackbar({ state, commit, dispatch }, Snackbar) {
    commit('SET_SNACKBAR', {
      opened: Snackbar.opened,
      text: Snackbar.text,
      timeout: 0,
    })
    setTimeout(() => {
      commit('SET_SNACKBAR', { opened: false, text: '', timeout: 0 })
    }, Snackbar.timeout)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('setLoading', true)
  },
}

export const getters = {
  getLoading: (state) => {
    return state.isLoading
  },
  isAuthenticated: (state) => {
    return state.auth.loggedIn
  },
  loggedInUser: (state) => {
    return state.auth.user
  },
  getSnackbar: (state) => {
    return state.snackbar
  },
}
