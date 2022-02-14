<template>
  <div style="font-family: Palatino, URW Palladio L, serif; color: white">
    <div class="categories" style="height: 250px;">
      <v-container>
        <v-row
          ><v-col class="category" v-for="(item, i) in categories" :key="i">
            <div style="font-size: 44px; margin-top: 10%">{{ item.title }}</div>
            <div>{{ item.body }}</div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { title: "Virtual NFTs", body: "Digitizing real world art." },
        {
          title: "Physical Art",
          body: "Real art created by local Austin artists."
        },
        {
          title: "Digital Licensing",
          body: "Licensing through decentralized and open processes."
        }
      ]
    };
  }
};
</script>

<style>
.categories {
  /* background-image: url("./static/cross-section.jpg"); */
  background-color: black;
}
</style>
