<template>
  <v-row>
    <v-col cols="12">
      <div v-if="user">{{ user.email }}</div>
    </v-col>
  </v-row>
</template>
<script>
import Vue from 'vue'
import { UserManager, WebStorageStateStore } from 'oidc-client'
import { mapActions } from 'vuex'
export default {
  data: () => {
    return {
      userMgr: null,
      user: null,
    }
  },
  created() {
    if (!process.server) {
      this.userMgr = new UserManager({
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
    }
  },
  mounted() {
    if (this.userMgr) {
      const { code, scope, state } = this.$route.query
      const sessionState = this.$route.query.session_state
      // debugger
      if (code && scope && sessionState && state) {
        this.userMgr.signinRedirectCallback().then((user) => {
          console.log('USER:', user)
          Vue.prototype.$auth = {
            user: { ...user.profile, accessToken: user.access_token },
            isAuthinticated: true,
          }

          // this.$auth.setUser(user)
          this.$router.push('/')
          // this.setSnackbar({ opened: true, text: 'Logged In!', timeout: 2000 })
        })
      }
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
  },
}
</script>
