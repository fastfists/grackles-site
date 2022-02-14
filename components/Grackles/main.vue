<template>
  <v-container style="margin-top: 2%; height: 100vh; min-height: 600px">
    <v-row style="font-family: Palatino, URW Palladio L, serif; color: black">
      <v-col>
        <div
          style="font-weight: 400; font-size: 80px !important; text-align: left;"
        >
          Grabby Grackles
        </div>
        <div
          style="font-size: 24px !important; margin: 0 auto; text-align: left;"
        >
          by Aparna Vishwanath
        </div>
        <div
          style="margin-right: 10%; margin-top: 3%; font-size: 24px !important; text-align: left;"
        >
          Fun and wacky grackles that bring Austin flair to the NFT world.
        </div>
        <img
          style="display: flex; margin: 0 auto; margin-top: 3%; height: 200px; cursor: pointer;"
          src="/brush/buy.png"
        />
        <!-- <v-btn
          color="black"
          style="display: flex; margin: 0 auto; font-weight: 400; margin-top: 3%; height: 20%; color: white;"
        >
          Buy Now</v-btn
        > -->
      </v-col>
    </v-row>
    <div class="gallery" style="margin-top: 0">
      <div class="gallery-panel" v-for="photo in photos" :key="photo.id">
        <img :src="photo.filename" />
      </div>
    </div>
    <GracklesFaq />
  </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      photos: [
        {
          id: "crypto",
          filename: "/collections/grabby/SecretService.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/SherlockGrackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/TorchyGrackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Viking.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Crypto2.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Cryptograckle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/HippieGrackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Invisible.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Jack.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/JoeGrackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Matt.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Oktoberfest.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Pirate.jpg"
        }
      ]
    };
  }
};
</script>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
