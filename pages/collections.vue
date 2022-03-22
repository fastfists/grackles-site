<template>
  <v-container style="margin-top: 2%; height: 100vh; min-height: 600px">
    <div class="gallery" style="margin-top: 0">
      <div class="gallery-panel" v-for="(collection, index) in collections" :key="collection.id">
        <nuxt-link
           :to="collection.url"
           style="text-decoration: none; color: inherit;"
            >
            <v-img
                class="v-img"
                style="cursor: pointer;"
                :src="collection.sample_image" />
            <div class="headline"> {{collection.title}} </div>
            <div class="subtitle-1"> {{collection.description}} </div>
        </nuxt-link>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        collections: [
        {
            id: 1,
            title: "Grabby Grackles",
            sample_image: "/collections/grabby-preview.jpg",
            description: "Bringing Austin Flare...",
            url: "/grabby-grackles"
        },
        {
            id: 2,
            title: "SUPERFLUITY",
            sample_image: "/collections/grabby-preview.jpg",
            description: "Stephen St. Francis Decky",
            url: "/"
        }, ]
    };
  }
};
</script>

<style></style>
