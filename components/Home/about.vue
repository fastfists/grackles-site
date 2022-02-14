<template>
  <v-container>
    <v-row style="font-family: Palatino, URW Palladio L, serif; color: black">
      <v-col>
        <div
          style="font-weight: 400; font-size: 80px !important; text-align: center;"
        >
          Grackle Studio
        </div>
        <div
          style="font-size: 24px !important; margin: 0 auto; text-align: center;"
        >
          by Graydon Parrish
        </div>
        <div
          style="margin-left: 10%; margin-right: 10%; margin-top: 3%; font-size: 24px !important; text-align: center;"
        >
          Austin, TX based studio focused on bringing quality art to the NFT
          space. Gathering local artists and advanced technology to create and
          enhanced art experience.
        </div>

        <v-btn
          color="black"
          style="display: flex; font-weight: 400; margin: 0 auto; margin-top: 3%; height: 10%; color: white;"
          >Start Collecting</v-btn
        >
        <vueper-slides
          style="margin-top: 5%; border-radius: 2 rem;"
          class="no-shadow"
          :visible-slides="3"
          :infinite="true"
          :autoplay="true"
          :gap="3"
          :slide-ratio="1 / 4"
          :dragging-distance="200"
        >
          <vueper-slide v-for="i in images" :key="i" :image="i" />
        </vueper-slides>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      images: [
        "home/1.jpg",
        "home/2.jpg",
        "home/3.jpg",
        "collections/grabby/grabby_1.jpg"
      ]
    };
  }
};
</script>

<style></style>
