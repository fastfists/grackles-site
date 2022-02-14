<template>
  <v-app dark>
    <Header />
    <v-main class="background">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style>
.background {
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  display: table-cell !important;
}
</style>
