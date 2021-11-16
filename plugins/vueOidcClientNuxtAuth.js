// import { configureOidc } from '../idsrvAuth-async'
// import Vue from 'vue'
// import idsrvAuth from '../idsrvAuth'
// import App from './App.vue'
// import router from './router'

import { UserManager, WebStorageStateStore } from 'oidc-client'

export default (context, inject) => {
  const userManager = new UserManager({
    authority: 'https://localhost:44310',
    client_id: 'vue.admin.nuxt',
    redirect_uri: 'http://localhost:5000/login/callback',
    response_type: 'code',
    scope: 'openid profile email',
    loadUserInfo: true,
    post_logout_redirect_uri: 'http://localhost:5000',
    silent_redirect_uri: 'http://localhost:5000',
    // eslint-disable-next-line nuxt/no-globals-in-created
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  })

  // Vue.prototype.$oidc = {
  //   mgr: userManager,
  //   user: context.store.getters['oidc/getUser'],
  //   isAuthenticated: context.store.getters['oidc/getIsAuthenticated'],
  // }

  inject('auth', userManager)
  context.$axios.onRequest((config) => {
    return userManager.getUser().then((user) => {
      if (user && user.access_token)
        config.headers.Authorization = 'Bearer ' + user?.access_token

      return config
    })
  })

  console.log('Store:', context.store)
}
