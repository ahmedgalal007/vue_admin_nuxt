<template>
  <v-app dark>
    <v-main class="d-flex align-center">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <the-snackbar />
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title = 'Login'
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
