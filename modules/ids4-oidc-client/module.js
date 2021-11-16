// import path from 'path'

const consoleObjectKeys = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`)
  }
}

// path.resolve(__dirname, 'plugin.js')

export default function (moduleOptions) {
  const { nuxt } = this
  consoleObjectKeys(this)
  this.extendRoutes((routes) => {
    // idsrvAuth.useRouter(routes)
  })

  nuxt.hook('render:routeDone', (url, result, context) => {
    // Called after the renderer was created
  })

  nuxt.hook('listen', (nuxt) => {
    // consoleObjectKeys(nuxt)
    // const usrMgr = new UserManager({
    //   authority: 'https://localhost:44310',
    //   client_id: 'vue.admin.nuxt',
    //   redirect_uri: 'http://localhost:5000/login/callback',
    //   response_type: 'code',
    //   scope: 'openid profile email',
    //   loadUserInfo: true,
    //   post_logout_redirect_uri: 'http://localhost:5000',
    //   silent_redirect_uri: 'http://localhost:5000',
    //   // eslint-disable-next-line nuxt/no-globals-in-created
    //   userStore: new WebStorageStateStore({ store: window.localStorage }),
    // })
    // Vue.prototype.$oidc = { userManager: usrMgr, user: User }
  })
}
