// export const strict = false
export const state = () => ({
  language: 'en',
  rtl:true,
  isLoading: false,
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
}

export const actions = {
  nuxtServerInit({ state, dispatch }) {
    // const { accessToken } = state.oauth
    console.log('state.oauth', state.oauth)
    // if (accessToken) {
    //   console.log('nuxtServerInit logged in')
    //   const success = await dispatch('auth/convertToken', accessToken)
    //   console.log(' nuxtServerInit success', success)
    // } else {
    //   console.log('not logged in')
    // }
  },
  // ! Passing context object {state, commit, dispatch }
  setLoading({ state, commit, dispatch }, Enabled) {
    commit('SET_LOADING', Enabled)
  },

  setLanguage({i18n}, local){
    i18n.switchLocalePath(local);
  }

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
}
