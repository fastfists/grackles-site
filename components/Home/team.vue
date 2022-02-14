<template>
  <div style="font-family: Palatino, URW Palladio L, serif;">
    <div style="height: 100vh">
      <v-container>
        <div
          class="grid-container"
          style="margin-top: 100px; margin-left: 10%;"
        >
          <v-col v-for="(item, i) in categories" :key="i">
            <v-row
              ><div class="team-img-mask">
                <img :src="'/team/' + categories[i].img" class="team-img" />
              </div>
            </v-row>
            <v-row>
              <div style="font-size: 24px">{{ item.title }}</div>
            </v-row>
          </v-col>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { title: "Graydon Parrish", img: "grackle1.jpg" },
        { title: "Aparna Rupakula", img: "grackle2.jpg" },
        { title: "Emily Dolson", img: "grackle3.jpg" }
      ]
    };
  }
};
</script>

<style lang="scss">
.team-img-mask {
  height: 220px;
  width: 220px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.team-img {
  height: 220px;
  border-radius: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
