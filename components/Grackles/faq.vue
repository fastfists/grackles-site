<template>
  <v-container
    style="font-family: Palatino, URW Palladio L, serif; color: black;"
  >
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in list" :key="i">
        <v-expansion-panel-header> {{ item.q }} </v-expansion-panel-header>
        <v-expansion-panel-content style="padding-top: 10px">
          {{ item.a }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    list: [
      {
        q: "When will Grabby Grackles launch?",
        a: ""
      },
      {
        q: "What is the starting price of each Grackle?",
        a: ""
      }
    ]
  }),
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    }
  }
};
</script>

<style scoped>
>>> .v-expansion-panel-header {
  background-color: #ffffff !important;
}

.v-expansion-panel-content__wrap {
}
</style>
