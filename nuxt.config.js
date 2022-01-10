import colors from 'vuetify/es5/util/colors'
import hooks from './hooks'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vue_admin_nuxt',
    title: 'vue_admin_nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  hooks: hooks(this),
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/global-components',
    '~/plugins/axios',
    { src: '~/plugins/vee-validate.js', ssr: true },
    // { src: '~/plugins/vueOidcClientNuxtAuth', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://i18n.nuxtjs.org/setup
    [
      '@nuxtjs/i18n',
      {
        /* module options */
      },
    ],
    // [
    //   '~/modules/ids4-oidc-client/module.js',
    //   {
    //     /* module options */
    //   },
    // ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://127.0.0.1:3333/api',
    // baseURL: 'https://localhost:5000/',
    proxy: true,
  },

  proxy: {
    // '/api/': {
    //   target: 'https://localhost:44310/',
    //   pathRewrite: { '^/api/': '' },
    //   changeOrigin: true,
    // },
  },

  // Auth module configurations
  auth: {
    strategies: {
      // local: {
      //   endpoints: {
      //     login: { url: 'login', method: 'post', propertyName: 'data.token' },
      //     user: { url: 'me', method: 'get', propertyName: 'data' },
      //     logout: false,
      //   },
      // },
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://sts.akhbarelyom.com/connect/authorize',
          token: 'https://sts.akhbarelyom.com/connect/token',
          // redirect_uri: ['http://localhost:5000/login/callback'],
          userInfo: 'https://sts.akhbarelyom.com/connect/userinfo',
          logout: 'http://localhost:5000/signed-out',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        redirectUri: ['http://localhost:5000/login/callback'],
        logoutRedirectUri: undefined,
        clientId: 'vue_admin_nuxt',
        scope: ['openid', 'profile', 'email', 'roles'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: 'S256',
        responseMode: '',
        acrValues: '',
        // requirePkce: 'true',
        // autoLogout: false
      },
      // oidcClient: {
      //   scheme: '~/schemes/oidcClient',
      // },
    },
    redirect: {
      callback: '/login/callback/',
      logout: '/signed-out',
      logoutRedirectUri: '/login',
      home: '/',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: false,
      light: true,
      default: 'light',
      disable: false,
      options: {
        cspNonce: undefined,
        customProperties: undefined,
        minifyTheme: undefined,
        themeCache: undefined,
      },
      themes:{
        light: {},
        dark: {
          primary: colors.blue.darken2,
          fontcolor: colors.green.accent4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
  },

  i18n: {
    locales: [
      {
        code: 'ar',
        file: 'ar-EG.js',
        name: 'العربية',
        src: '/images/svg/flags/sa.svg',
        rtl:true,
      },
      {
        code: 'en',
        file: 'en-US.js',
        name: 'English',
        src: '/images/svg/flags/gb.svg',
        rtl:false,
      },
      {
        code: 'es',
        file: 'es-ES.js',
        name: 'Espaneol',
        src: '/images/svg/flags/gb.svg',
        rtl:false,
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
        name: 'Frensh',
        src: '/images/svg/flags/gb.svg',
        rtl:false,
      }
    ],
    defaultLocale: 'ar',
    lazy: true,
    langDir: 'localizations/',
    silentTranslationWarn: false,
  },
  server: { port: 5000 },

  router: {
    // middleware: ['auth'],
    // middleware: ['vuex-oidc-router'],
    // middleware: ['vueOidcClientNuxtAuthMiddleware']
    middleware: ['vueOidcClientNuxtAuth'],
  },
}
