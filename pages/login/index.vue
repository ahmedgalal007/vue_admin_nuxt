<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <form method="post" @submit.prevent="login">
            <v-card class="logo d-flex justify-center">
              <nuxt-link to="/">
                <EpicLogo />
              </nuxt-link>
            </v-card>
            <v-card>
              <v-divider></v-divider>
              <v-card-title justify="center" class="headline justify-center">
                EPIC SYSTEMS
              </v-card-title>
              <v-card-text>
                <validation-provider
                  v-slot="{ errors }"
                  name="userName"
                  rules="required|max:25"
                >
                  <v-text-field
                    v-model="userName"
                    :counter="25"
                    :error-messages="errors"
                    label="User Name"
                    prepend-icon="mdi-account-circle"
                    required
                    outlined
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="password"
                  autocomplete
                  :rules="{
                    required: true,
                    max: 12,
                    min: 8,
                  }"
                >
                  <v-text-field
                    v-model="password"
                    :counter="12"
                    :error-messages="errors"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    required
                    outlined
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="rememberMe"
                >
                  <v-checkbox
                    v-model="rememberMe"
                    :error-messages="errors"
                    value="1"
                    label="Remember Me"
                    type="checkbox"
                    required
                  ></v-checkbox>
                </validation-provider>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="error" type="submit" :disabled="invalid" block>
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-col>

        <v-col cols="12" sm="8" md="4">
          <v-btn
            color="error"
            block
            title="Identity Server"
            @click.prevent="oidclogin"
            >Identity Server Login</v-btn
          >
          <v-btn
            color="error"
            block
            title="Identity Server"
            @click.prevent="authlogin"
            >social Login</v-btn
          >
        </v-col>
      </v-row>
    </validation-observer>
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  required,
  digits,
  email,
  min,
  max,
  regex,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

// import { UserManager, WebStorageStateStore } from 'oidc-client'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  layout: 'empty2',

  middleware: ['auth'],
  auth: false,

  data: () => ({
    // userMgr: null,
    userName: '',
    password: '',
    showPassword: false,
    rememberMe: null,

    email: '',
    error: null,
  }),
  created() {
    if (!process.server) {
      // this.userMgr = new UserManager({
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
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    submit() {
      this.$refs.observer.validate()
    },
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.userName,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
        console.log('ERROR:', this.error)
      } finally {
        console.log('LoggedIN:', this.$auth.user)
      }
    },

    oidclogin() {
      // return this.$auth
      //   .loginWith('local')
      //   .then((respone) => console.log('response', respone))
      return this.$auth.signinRedirect().then((usr) => {
        // Vue.prototype.$oidc.mgr = this.$oidc.mgr
        // Vue.prototype.$oidc.user = usr
        // Vue.prototype.$oidc.isAuthenticated = true
        console.log('$auth_callback', this.$auth)
        // Vue.prototype.$oidc = { userManager: this.userMgr, user: usr }
        // console.log('Vue.prototype.$oidc', Vue.prototype.$oidc)
      })
    },
    async authlogin() {
      try {
        await this.$auth.logout('local')
        await this.$auth.loginWith('social')
        // .then(() => this.$toast.success('Logged In!'))
      } catch (e) {
        this.error = e.response.data.message
        console.log('ERROR:', this.error)
      } finally {
        console.log('LoggedIN:', this.$auth.user)
      }
    },
  },
}
</script>
