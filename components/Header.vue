<template>
  <v-app-bar
    color="white"
    scroll-target="#scrolling-techniques-2"
    style="font-family: Palatino, URW Palladio L, serif; color: black"
  >
    <LogoGrackle style="position: absolute; top: 2px; height: 150%" />
    <template v-slot:extension>
      <v-tabs centered color="black">
        <v-tab text rounded nuxt to="/#home">Home</v-tab>
        <v-tab text rounded nuxt to="/#team">Team</v-tab>
        <v-tab text rounded nuxt to="/gallery">Gallery</v-tab>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-tab text rounded v-on="on" nuxt to="/collections"
              >Collections</v-tab
            >
          </template>
          <!-- <v-card>
            <v-list>
              <div
                v-for="collection in collections"
                :key="`collection-key-${collection.title}`"
              >
                <nuxt-link
                  :to="collection.url"
                  style="text-decoration: none; color: inherit;"
                  ><div
                    style="font-family: Palatino, URW Palladio L, serif !important; color: black; cursor: pointer; text-align: center"
                  >
                    {{ collection.title }}
                  </div>
                </nuxt-link>
              </div>
            </v-list>
          </v-card> -->
        </v-menu>
      </v-tabs>
    </template>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-twitter</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-discord</v-icon>
    </v-btn>
    <v-btn elevation="2"
      >Sign In
      <img
        @click="clickedLogo"
        style="height: 20px; margin-left: 10px"
        alt="Metamask Logo"
        src="/metamask.png"
    /></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      collections: [{ title: "Grabby Grackles", url: "grabby-grackles" }]
    };
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    clickedLogo() {}
  }
};
</script>

<style lang="scss">
@media (max-width: 700px) {
  .header-text {
    font-size: 10px !important;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding-left: 2px;
    padding-right: 2px;
  }
}

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: black;
}
</style>
