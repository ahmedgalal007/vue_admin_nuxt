<template>
  <v-app>
    <!--v-admin-navigation-drawer
      ref="navDrawer"
      :drawer="getDrawer"
      :mini-variant="getPinned"
      :clipped="getClipped"
      :right="$vuetify.rtl"
    /-->
    <v-modern-navigation-drawer
      ref="navDrawer"
      :drawer="getDrawer"
      :mini-variant="getPinned"
      :clipped="getClipped"
      :right="$vuetify.rtl"
    />
    <v-app-bar
      :clipped-left="!$vuetify.rtl && getClipped ? true : false"
      :clipped-right="$vuetify.rtl && getClipped ? true : false"
      fixed
      app
      class="font-weight-thin"
      color="primary"
      :extended="false"
      extension-height="40"
    >
      <!-- v-app-bar-nav-icon @click.stop="toggelDrawer" /-->
      <v-btn icon @click.stop="toggelDrawer">
        <v-icon>
          {{ `mdi-backburger ${getDrawer ? ' mdi-flip-h' : ''}` }}
        </v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.lgAndUp" icon @click.stop="toggelPinned">
        <!--v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon-->
        <v-icon>
          mdi-{{ `pin-${miniVariant ? 'outline' : 'off-outline'}` }}
        </v-icon>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.lgAndUp"
        icon
        @click.stop="toggelClipped"
      >
        <v-icon>
          mdi-arrow-collapse-up
          {{ `${!getClipped ? 'mdi-flip-v' : ''}` }}
        </v-icon>
      </v-btn>
      <!--v-btn icon @click.stop="changeRTL(!$vuetify.rtl)">
        <v-icon class="white--text">
          mdi-{{ `align-horizontal-${!$vuetify.rtl ? 'right' : 'left'}`}}
        </v-icon>
      </v-btn-->
      <v-switch
        v-model="$vuetify.theme.dark"
        align="center"
        class="pa-4 mx-1"
        hide-details
        color="secondary"
      >
        <template #label>
          <v-subheader>{{
            `${$vuetify.theme.dark ? 'dark' : 'light'}`
          }}</v-subheader>
          <v-progress-circular
            :indeterminate="$vuetify.theme.dark"
            :value="0"
            size="24"
            color="secondary"
            :class="'ml-2 ' + (!$vuetify.theme.dark ? 'd-none' : '')"
          ></v-progress-circular>
        </template>
      </v-switch>
      <v-toolbar-title v-text="$t(title)" />
      <v-toolbar-items>
        <ThemeChanger />
      </v-toolbar-items>
      <v-spacer />
      <client-only>
        <v-btn v-if="isAuthenticated" icon @click.stop="$auth.logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </client-only>
      <v-language-menu></v-language-menu>
      <v-btn icon @click.stop="toggelRightDrawer">
        <v-icon class="text-secondary-darken-1">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main >
      <v-container>
          <loading-bar  v-if="nuxtLoader" />
          <Nuxt v-else/>
      </v-container>
    </v-main>
    <v-admin-right-drawer
      ref="rightDrawer"
      :right-drawer="rightDrawer"
      :right="!$vuetify.rtl"
    ></v-admin-right-drawer>
    <v-admin-footer></v-admin-footer>
    <!--v-snackbar
      v-model="getSnackbar.opened"
      :timeout="getSnackbar.timeout"
      :right="$vuetify.breakpoint.lgAndUp"
    >
      {{ text }}

      <template #action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="setSnackbar({ opened: false, text: '', timeout: 0 })"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar-->
    
    <the-snackbar />
    <v-speed-dial-menu />
    
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import idsrvAuth from '../idsrvAuth'
// import VAnimatedGeadient from './default/backgrounds/v-animated-gradient.vue'
// import VAdminNavigationDrawer from './default/navigations/v-admin-navigation-drawer.vue'
import VModernNavigationDrawer from './default/navigations/v-modern-navigation-drawer.vue'

import VAdminFooter from './default/v-admin-footer.vue'
import VLanguageMenu from './default/v-language-menu.vue'
import VSpeedDialMenu from './default/v-speed-dial-menu.vue'
import VAdminRightDrawer from './default/v-admin-right-drawer.vue'
import ThemeChanger from './default/theme-provider/ThemeChangerMenu.vue'
import TheSnackbar from '~/components/TheSnackbar.vue'
import LoadingBar from '~/components/LoadingBar.vue';
;

// import idsrvAuth from '~/idsrvAuth'

export default {
  name: 'VDefaultTemplate',
  components: {
    // VAdminNavigationDrawer,
    VModernNavigationDrawer,
    VAdminFooter,
    VLanguageMenu,
    VAdminRightDrawer,
    TheSnackbar,
    // VAnimatedGeadient,
    VSpeedDialMenu,
    ThemeChanger,
    LoadingBar,
  },
  middleware: ['vueOidcClientNuxtAuth'],
  data() {
    return {
      miniVariant: true,
      clipped: true,
      // right: false,
      drawer: true,
      // snackbar: true,
      // text: 'My timeout is set to 2000.',
      // timeout: 2000,
      rightDrawer: false,
      title: 'navbar.Company Name',
      loading5: false,
    }
  },
  computed: {
    ...mapGetters(['getLoading', 'isAuthenticated', 'loggedInUser']),
    ...mapGetters('ui',['nuxtLoader']),
    // ...mapGetters('oidc', ['oidcIsAuthenticated']),
    // hasAccess() {
    //   return this.oidcIsAuthenticated || this.oidcIsRoutePublic(this.$route)
    // },
    getDrawer() {
      return this.drawer
    },
    getClipped() {
      return this.clipped
    },
    getPinned() {
      return this.miniVariant
    },
    getLoading(){
      return this.loading;
    }
  },
  mounted() {
    console.log('isAuthenticated', this.isAuthenticated)
    console.log('THEME', this.$vuetify.theme)
    this.$vuetify.theme.red = true;
    // window.addEventListener('vuexoidc:userLoaded', this.userLoaded)

    
  
  },
  destroyed() {
    // window.removeEventListener('vuexoidc:userLoaded', this.userLoaded)
  },
  methods: {
    // ...mapGetters('oidc', ['oidcIsRoutePublic']),
    // // eslint-disable-next-line object-shorthand
    // userLoaded: function (e) {
    //   console.log(
    //     'I am listening to the user loaded event in vuex-oidc',
    //     e.detail
    //   )
    // },
    toggelDrawer() {
      this.drawer = this.$refs.navDrawer.toggelDrawer()
    },
    toggelPinned() {
      this.miniVariant = this.$refs.navDrawer.toggelPinned()
    },
    toggelClipped() {
      this.clipped = this.$refs.navDrawer.toggelClipped()
    },
    toggelRightDrawer() {
      this.miniVariant = this.$refs.rightDrawer.toggelRightDrawer()
    },
    changeRTL(val) {
      // this.$vuetify.theme.themes.dark.anchor = '#ff0000'
      this.$vuetify.rtl = val
      // this.right = !val
    },
    openSnakbar(text, timeout) {
      // this.text = text
      // this.timeout = timeout
      // this.snackbar = true
    },
    toggleTheme() {
      this.$vuetify.theme.light = !this.$vuetify.theme.dark
    },
    ...mapActions(['setLoading', 'snackbar/setSnackbar']),
  },
}
</script>
<style lang="scss">
/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color:  var(--v-primary-base) #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color:  var(--v-primary-base);
    border-radius: 10px;
    border: 3px solid #ffffff;
  }

  nav .v-list-item__title,
  nav .v-toolbar__title,
  nav .theme--light.v-sheet,
  nav .theme--light.v-label,
  nav .theme--light.v-subheader,
  nav .theme--light.v-icon,
  nav .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
  nav .theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__subtitle, 
  nav .theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__action-text, 
  nav .theme--light.v-btn.v-btn--icon{color: var(--v-menu--text-lighten2) !important}
  header .v-toolbar__title,
  header .theme--light.v-sheet,
  header .theme--light.v-label,
  header .theme--light.v-subheader,
  header .theme--light.v-icon,
  header .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
  header .theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__subtitle, 
  header .theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__action-text, 
  header .theme--light.v-btn.v-btn--icon{color: var(--v-menu--text-lighten2) !important}

  nav .v-list-item:hover .v-list-item__title,
  nav .v-list-item--active .v-list-item__title{color: var(--v-primary-base) !important}
</style>