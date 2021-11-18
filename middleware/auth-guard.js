export default async function ({ $auth, route, redirect, store }) {
  if (!$auth.loggedIn) {
    const REDIRECT_URL = '/login?redirect=' + route.path
    // const REDIRECT_URL = '/'
    console.log('auth-guard:store:', store)

    const snackbar = {
      color: 'error',
      text: 'You must be logged in to view that page.',
      showing: true,
      timeout: 2000,
    }

    await store // .commit('snackbar/SET_SNACKBAR', snackbar)
      .dispatch('snackbar/setSnackbar', snackbar)
      .then(() => redirect(REDIRECT_URL))
  }
}
