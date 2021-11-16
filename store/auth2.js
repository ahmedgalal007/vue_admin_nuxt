export const state = () => ({
  accessToken: null,
  expiresIn: null,
  tokenType: null,
  refreshToken: null,
})

export const mutations = {
  setConvertData(state, data) {
    state.accessToken = data.access_token
    state.expiresIn = data.expires_in
    state.tokenType = data.token_type
    state.refreshToken = data.refresh_token
  },
}

export const actions = {
  convertToken({ commit, state }, accessToken) {
    const params = {
      grant_type: 'convert_token',
      client_id: '<client_id>',
      client_secret: '<client_secret>',
      backend: '<backend-name>-oauth2',
      token: accessToken,
    }
    return this.$axios.post('/auth/convert-token', params).then((res) => {
      commit('setConvertData', res.data)
    })
  },
}
