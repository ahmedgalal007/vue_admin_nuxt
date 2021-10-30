<template>
  <v-footer :absolute="!fixed" app>
    <v-btn icon @click.stop="fixed = !fixed">
      <!--v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon-->
      <v-icon>mdi-{{ `pin-${fixed ? 'outline' : 'off-outline'}` }}</v-icon>
    </v-btn>
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-btn
        dark
        color="success darken-2"
        @click="opensnakbar('Open From Footer', 1000)"
      >
        Open Snackbar
      </v-btn>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'VAdminFooter',
  props: { opensnakbar: { type: Function, default: (message, timeout) => {} } },
  data() {
    return {
      fixed: false,
      counter: 0,
    }
  },
}
</script>
