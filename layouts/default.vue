<template>
  <v-app>
    <v-admin-navigation-drawer
      ref="navDrawer"
      :drawer="getDrawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="!right"
    ></v-admin-navigation-drawer>
    <v-app-bar
      :clipped-left="!$vuetify.rtl && getClipped ? true : false"
      :clipped-right="$vuetify.rtl && getClipped ? true : false"
      fixed
      app
      class="white--text font-weight-thin"
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggelDrawer" />
      <v-btn v-if="$vuetify.breakpoint.lgAndUp" icon @click.stop="toggelPinned">
        <!--v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon-->
        <v-icon
          >mdi-{{ `pin-${miniVariant ? 'outline' : 'off-outline'}` }}</v-icon
        >
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.lgAndUp"
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="changeRTL(!$vuetify.rtl)">
        <v-icon
          >mdi-{{
            `align-horizontal-${!$vuetify.rtl ? 'right' : 'left'}`
          }}</v-icon
        >
      </v-btn>
      <v-switch
        v-model="$vuetify.theme.dark"
        :color="!!$vuetify.theme.dark ? 'red' : 'orange'"
        align="center"
        class="pa-4 mx-1"
        hide-details
        light
      >
        <template #label>
          <v-subheader dark>{{
            `${$vuetify.theme.dark ? 'dark' : 'light'}`
          }}</v-subheader>
          <v-progress-circular
            :indeterminate="$vuetify.theme.dark"
            :value="0"
            size="24"
            color="orange"
            :class="'ml-2 ' + (!$vuetify.theme.dark ? 'd-none' : '')"
          ></v-progress-circular>
        </template>
      </v-switch>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-language-menu></v-language-menu>
      <v-btn icon @click.stop="toggelRightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="indigo lighten-5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-admin-right-drawer
      ref="rightDrawer"
      :right-drawer="rightDrawer"
      :right="right"
    ></v-admin-right-drawer>
    <v-admin-footer :opensnakbar="openSnakbar"></v-admin-footer>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :right="$vuetify.breakpoint.lgAndUp"
    >
      {{ text }}

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import VAdminNavigationDrawer from './default/v-admin-navigation-drawer.vue'
import VAdminFooter from './default/v-admin-footer.vue'
import VLanguageMenu from './default/v-language-menu.vue'
import VAdminRightDrawer from './default/v-admin-right-drawer.vue'
export default {
  components: {
    VAdminNavigationDrawer,
    VAdminFooter,
    VLanguageMenu,
    VAdminRightDrawer,
  },
  data() {
    return {
      miniVariant: true,
      clipped: true,
      right: false,
      drawer: true,
      snackbar: true,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      rightDrawer: false,
      title: 'Vuetify.js',
      loading5: false,
    }
  },
  computed: {
    getDrawer() {
      return this.drawer
    },
    getClipped() {
      return this.clipped
    },
  },
  methods: {
    toggelDrawer() {
      this.$refs.navDrawer.toggelDrawer()
    },
    toggelPinned() {
      this.miniVariant = this.$refs.navDrawer.toggelPinned()
    },
    toggelRightDrawer() {
      this.miniVariant = this.$refs.rightDrawer.toggelRightDrawer()
    },
    changeRTL(val) {
      this.$vuetify.theme.themes.dark.anchor = '#ff0000'
      this.$vuetify.rtl = val
      this.right = !val
    },
    openSnakbar(text, timeout) {
      this.text = text
      this.timeout = timeout
      this.snackbar = true
    },
    toggleTheme() {
      this.$vuetify.theme.light = !this.$vuetify.theme.dark
      // this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      console.log('Dark:', this.$vuetify.theme.dark)
      console.log('Light:', this.$vuetify.theme.light)
    },
  },
}
</script>
