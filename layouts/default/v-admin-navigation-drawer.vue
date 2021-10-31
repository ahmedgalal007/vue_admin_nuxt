<template>
  <v-navigation-drawer
    v-model="pDrawer"
    :mini-variant="pMiniVariant && $vuetify.breakpoint.lgAndUp"
    :clipped="clipped"
    :right="right"
    fixed
    app
    color="secondary"
    dark
    @mouseenter.native="
      pinned = pMiniVariant
      pMiniVariant = false
    "
    @mouseleave.native="pMiniVariant = pinned"
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
</template>

<script>
export default {
  name: 'VAdminNavigationDrawer',
  props: {
    drawer: { type: Boolean, default: true },
    miniVariant: { type: Boolean, default: false },
    clipped: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
  },
  data() {
    return {
      pDrawer: this.getDrawer,
      pClipped: this.clipped,
      pMiniVariant: this.miniVariant,
      pinned: this.miniVariant,
      pRight: this.right,
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
    }
  },
  methods: {
    toggelDrawer() {
      this.pDrawer = !this.pDrawer
      return this.pDrawer
    },
    toggelPinned() {
      this.pMiniVariant = !this.pMiniVariant
      return this.pMiniVariant
    },
  },
}
</script>

<style></style>
