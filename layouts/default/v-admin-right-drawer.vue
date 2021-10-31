<template>
  <v-navigation-drawer v-model="pRightDrawer" :right="right" temporary fixed>
    <v-list>
      <v-list-item @click.native="pRight = !pRight">
        <v-list-item-action>
          <v-icon light> mdi-repeat </v-icon>
        </v-list-item-action>
        <v-list-item-title>Switch drawer (click me)</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'VAdminRightDrawer',
  props: {
    right: { type: Boolean, default: false },
    rightDrawer: { type: Boolean, default: false },
  },
  data() {
    return {
      pRightDrawer: this.rightDrawer,
      pRight: this.right,
    }
  },
  methods: {
    toggelRightDrawer() {
      this.pRightDrawer = !this.pRightDrawer
    },
  },
}
</script>

<style></style>
