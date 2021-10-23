<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <form @submit.prevent="submit">
          <v-card class="logo d-flex justify-center">
            <EpicLogo />
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
                rules="required|max:10"
              >
                <v-text-field
                  v-model="userName"
                  :counter="10"
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
    </v-row>
  </validation-observer>
</template>

<script>
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
  data: () => ({
    userName: '',
    password: '',
    showPassword: false,
    rememberMe: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },
  },
}
</script>
