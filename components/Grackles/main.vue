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
        <div>
        </div>
        <!-- <v-btn
          color="black"
          style="display: flex; margin: 0 auto; font-weight: 400; margin-top: 3%; height: 20%; color: white;"
          src="/brush/buy.png"
        >
          Buy Now
          </v-btn
        > -->
      </v-col>
    </v-row>


    <div class="gallery" style="margin-top: 0">
      <div class="gallery-panel" v-for="(photo, index) in photos" :key="photo.id">

        <v-dialog
             v-model="dialog[index]"
             width="300"
          >
             <template v-slot:activator="{on}">
                <img
                  style="cursor: pointer;"
                  v-on="on"
                  :src="photo.filename" />
             </template>
             <GracklesSingle :id="index" :file_name="photo.filename" cost="0.521"/>
          </v-dialog>

      </div>
    </div>
    <GracklesFaq />
  </v-container>
</template>




<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";



export default {
  components: { VueperSlides, VueperSlide},
  data() {
    return {
      dialog: [],
      photos: [
        {
          id: "crypto",
          filename: "/collections/grabby/Airpod Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Angry hippie Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Art critic Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Artsy Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Banksy Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Blue origin grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/British Judge.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Cryptopunk Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Drunk artist grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Duty free Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Evening Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/German Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Green hat.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Habanero Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Hairdresser bird.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Invisible Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Joe Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Longhorns Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/modern grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Oktoberfest Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Peacock Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Questioning Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Secret Service Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Shaky Crypto Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Sheriff Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Sherlock Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Singing Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Tax free Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/The cat.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/The pirate.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/The puppy Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/The rebel Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/The sneeze Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Too many drinks Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Torchy Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Turks cap.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Twitter Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Ukrainian Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/Viking Grackle.jpg"
        },
        {
          id: "crypto",
          filename: "/collections/grabby/VR Grackle.jpg"
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
