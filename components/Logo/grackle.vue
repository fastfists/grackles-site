<template>
  <img
    @click="clickedLogo"
    class="grackle-logo"
    alt="Grackle Studio Logo"
    src="/grackle.png"
  />
</template>

<script>
export default {
  methods: {
    clickedLogo() {
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
.grackle-logo {
  height: 80px;
}

@media (max-width: 700px) {
  .grackle-logo {
    height: 50px;
  }
}
</style>
