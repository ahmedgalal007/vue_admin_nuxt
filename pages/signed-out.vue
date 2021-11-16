<template>
  <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="8" align-self="center">
      <h1 class="">You have been signed out!</h1>
      <v-btn
        icon
        large
        color="error"
        @click="$router.push('localhost:44310/Account/Logout')"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>
</template>
