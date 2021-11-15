// import idsrvAuth from '../idsrvAuth'

export default (nuxtConfig) => {
  // const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
  // const base = Reflect.has(router, 'base') ? router.base : '/portal'
  // this.$oidc.useRouter(router)
  return {
    /**
     * 'render:setupMiddleware'
     * {@link node_modules/nuxt/lib/core/renderer.js}
     */
    setupMiddleware(app) {
      // app.use(idsrvAuth)
    },
  }
}
