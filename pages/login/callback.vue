<template>
  <v-row>
    <v-col cols="12">
      <h1>You are Logged IN !!!</h1>
    </v-col>
  </v-row>
</template>
<script>
// import Vue from 'vue'
// import { UserManager, WebStorageStateStore } from 'oidc-client'
import { mapActions } from 'vuex'
export default {
  mounted() {
    if (this.$auth) {
      const { code, scope, state } = this.$route.query
      const sessionState = this.$route.query.session_state
      // debugger
      if (code && scope && sessionState && state) {
        // this.$auth.signinRedirectCallback().then((user) => {
        //   console.log('USER:', user)
        //   this.$router.push('/')
        //   this.setUser(user)
        //   this.setIsAuthenticated(true)
        //   this.setSnackbar({ opened: true, text: 'Logged In!', timeout: 2000 })
        // })
        console.log('FETCH_USER:', this.$auth.user)
      }
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    ...mapActions('oidc', ['setUser', 'setIsAuthenticated']),
  },
}
</script>
