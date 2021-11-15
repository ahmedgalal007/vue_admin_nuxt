export const oidcSettings = {
  authority: 'https://localhost:44310',
  clientId: 'vue.admin.nuxt',
  redirectUri: 'http://localhost:5000/oidc-callback',
  responseType: 'id_token token',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  // silentRedirectUri: 'http://localhost:5000/silent-renew-oidc.html',

  postLogoutRedirectUri: '/',
  popupRedirectUri: 'http://localhost:5000/oidc-callback',
  silentRedirectUri: 'http://localhost:5000/oidc-callback',
}
