import { UserManager /* WebStorageStateStore */ } from 'oidc-client'
// openid client custom scheme to connect
import { LocalScheme } from '~auth/runtime'

export default class OidcClient extends LocalScheme {
  userMgr = new UserManager({
    authority: 'https://localhost:44310',
    client_id: 'vue.admin.nuxt',
    redirect_uri: 'http://localhost:5000/login',
    response_type: 'code',
    scope: 'openid profile email',
    loadUserInfo: true,
    post_logout_redirect_uri: 'http://localhost:5000',
    silent_redirect_uri: 'http://localhost:5000',
    // eslint-disable-next-line nuxt/no-globals-in-created
    // userStore: new WebStorageStateStore({}),
  })

  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    await this.userMgr
      .signinRedirect()
      .then((response) => console.log('Response:', response))
    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        const user = response.data // getProp(response.data, this.options.user.property)

        // Transform the user object
        const customUser = {
          ...user,
          fullName: user.firstName + ' ' + user.lastName,
          roles: ['user'],
        }

        // Set the custom user
        // The `customUser` object will be accessible through `this.$auth.user`
        // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
        this.$auth.setUser(customUser)

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })

    // function getProp(holder, propName) {
    //   if (!propName || !holder || typeof holder !== 'object') {
    //     return holder
    //   }
    //   if (propName in holder) {
    //     return holder[propName]
    //   }
    //   const propParts = Array.isArray(propName)
    //     ? propName
    //     : (propName + '').split('.')
    //   let result = holder
    //   while (propParts.length && result) {
    //     result = result[propParts.shift()]
    //   }
    //   return result
    // }
  }
}
