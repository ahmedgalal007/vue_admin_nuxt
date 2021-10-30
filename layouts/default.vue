<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant && $vuetify.breakpoint.lgAndUp"
      :clipped="clipped"
      :right="!right"
      fixed
      app
      color="secondary"
      dark
      @mouseenter.native="
        pinned = miniVariant
        miniVariant = false
      "
      @mouseleave.native="miniVariant = pinned"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!$vuetify.rtl && clipped ? true : false"
      :clipped-right="$vuetify.rtl && clipped ? true : false"
      fixed
      app
      class="white--text font-weight-thin"
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="$vuetify.breakpoint.lgAndUp"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
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

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="indigo lighten-5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
import VAdminFooter from './default/v-admin-footer.vue'
import VLanguageMenu from './default/v-language-menu.vue'
export default {
  components: {
    VAdminFooter,
    VLanguageMenu,
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      snackbar: true,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      items: [
        {
          icon: 'mdi-apps',
          title: this.$t('welcome'),
          to: this.localePath('/'),
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: this.localePath('/inspire'),
        },
        {
          icon: 'mdi-table',
          title: 'Data Table',
          to: this.localePath('/datatables'),
        },
        {
          icon: 'mdi-login-variant',
          title: 'Login',
          to: this.localePath('/login'),
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: this.localePath('/login/register'),
        },
      ],
      miniVariant: true,
      right: false,
      rightDrawer: false,
      title: 'Vuetify.js',
      pinned: this.miniVariant,
      loading5: false,
    }
  },
  methods: {
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
