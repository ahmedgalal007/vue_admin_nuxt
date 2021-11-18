<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 8}px`"
    >
      {{ snackbar.text }}
      <v-btn class="float-left" text @click="closeSnackbar({ ...snackbar })">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// :timeout="snackbar.timeout"
export default {
  computed: {
    ...mapState({
      snackbars: (state) => state.snackbar.snackbars,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['setSnackbar', 'closeSnackbar']),
  },
}
</script>

<style lang="scss" scoped></style>
