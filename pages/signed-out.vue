<template>
  <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="8" align-self="center">
      <h1 class="">You have been signed out!</h1>
      <client-only>
        <v-btn
          icon
          large
          color="error"
          @click="window.location = 'https://sts.akhbarelyom.com/Account/Logout'"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn></client-only
      >
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>
</template>
<script>
export default {
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = 'https://sts.akhbarelyom.com/Account/Logout'
    }
  },
}
</script>
