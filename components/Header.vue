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
      @click="connect"
      v-if="address == ''"
      >Sign In
      <img
        style="height: 20px; margin-left: 10px"
        alt="Metamask Logo"
        src="/metamask.png"
    /></v-btn>
    <div v-else>
        Connected {{address.slice(0, 5) + "..." + address.slice(-3)}}
    </div>
<!-- <v-snackbar v-model="alertOn" >
      {{ alertMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="alertOn = false"
        >
            Dismiss
        </v-btn>
      </template>
    </v-snackbar> -->

  </v-app-bar>
</template>

<script>
const handle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}

export default {
  data() {
    return {
      address: "",
      alertOn: false,
      alertMessage: "",
      collections: [{ title: "Grabby Grackles", url: "grabby-grackles" }]
    };
  },
  mounted() {
    if (window.ethereum) {
        this.getAccount().then().catch(e => console.log(e))
        ethereum.on('accountsChanged', this.handleAccountsChanged);
    }
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    handleAccountsChanged(accounts) {
        console.log(accounts);
        let newAddr = ""
        if (accounts.length === 0) {
            newAddr = ""
        } else {
            newAddr = accounts;
        }
        if (typeof newAddr === "object") {
            newAddr= accounts[0]
        } 

        if (this.address !== newAddr) {
            this.alertMessage = "Account Changed " + newAddr.slice(0, 5) + "..." + newAddr.slice(-3) 
            this.alertOn = true;
        }
        this.address = newAddr
    },
    async getAccount() {
        const [accounts, err] = await handle(ethereum.request({ method: 'eth_accounts' }))
        if (err) {
            console.log(err)
        }
        this.handleAccountsChanged(accounts);
    },
    async connect() {
      let [address, err] = await handle(ethereum.request({ method: 'eth_requestAccounts' }))

      if (err) {
        if (err.code == 4001) alert("Rejection request denied, try again.");
        console.log(err.data);
        return;
      }
      this.address = address[0];
    }
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
