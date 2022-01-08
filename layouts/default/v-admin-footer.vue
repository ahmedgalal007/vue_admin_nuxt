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
        @click="
          setSnackbar({
            showing: true,
            text: 'Open From Footer',
            timeout: 5000,
            color: 'blue',
          })
        "
      >
        Open Snackbar
      </v-btn>
    </div>
    
  </v-footer>
</template>

<script>
import { mapActions } from 'vuex'
// import vSpeedDialMenu from './v-speed-dial-menu.vue'
export default {
  // components: { vSpeedDialMenu },
  name: 'VAdminFooter',
  // props: { opensnakbar: { type: Function, default: (message, timeout) => {} } },
  data() {
    return {
      fixed: false,
      counter: 0,
    }
  },
  methods: {
    ...mapActions('snackbar', ['setSnackbar']),
  },
}
</script>
