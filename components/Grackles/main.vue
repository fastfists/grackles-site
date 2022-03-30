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
        <!-- <img
          style="display: flex; margin: 0 auto; margin-top: 3%; height: 200px; cursor: pointer;"
          src="/brush/buy.png"
        /> -->
        <div>
        </div>
        <!-- <v-btn
          color="black"
          style="display: flex; margin: 0 auto; font-weight: 400; margin-top: 3%; height: 20%; color: white;"
          src="/brush/buy.png" >
          Buy Now
          </v-btn> -->
      </v-col>
    </v-row>

    <div class="gallery" style="margin-top: 0">
      <div class="gallery-panel" v-for="(photo, index) in photos" :key="photo.id">

        <v-dialog
             v-model="dialog[index]"
             fullscreen
             >
             <template v-slot:activator="{on}">
                <div class="art">
                    <v-img
                      class="v-img"
                      style="cursor: pointer;"
                      v-if="!photo.taken"
                      v-on="on"
                      :src="photo.filename" />
                    <v-img
                      class="v-img"
                      style="cursor: pointer;"
                      v-else
                      :src="photo.filename" />
                    <div style="display: flex; justify-content: space-between; align-items: center">
                    <v-btn
                      class="caption"
                      v-if="!photo.taken"
                      v-on="on">
                        Buy this nft
                      </v-btn>
                    <v-btn
                      class="caption"
                      v-else
                      disabled>
                        Buy this nft
                      </v-btn>
                      <div>
                        {{photo.price}}
                      </div>
                    </div>
                </div>
             </template>
             <GracklesSingle :connected="address !== ''" :id="photo.id" :file_name="photo.filename" :onBuy="() => {onPurchase(index); alertOn = true; dialog[index] = false}" />
          </v-dialog>

      </div>
    </div>
    <GracklesFaq />
     <v-snackbar v-model="alertOn" >
          <v-progress-circular indeterminate color="primary">
          </v-progress-circular>
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
        </v-snackbar>
  </v-container>
</template>




<script>
import path from "path";
import { ethers } from "ethers";
import GrabbyGrackles from "../../artifacts/contracts/GrackleNFT.sol/GrabbyGrackles.json";

const og_owner_addr = "0x4aa35719ea06feab07a349d9cf93ebe0ca77babd"

const handle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}

export default {
  methods: {
  onPurchase(index) {
      this.alertMessage = "Validating transaction";
      this.alertIndex = index;
  },
  async handleConnect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // TODO update on change
    const CONTRACT_ADDRESS = "0x4221Dc42D8AcB2a46b837F3F683593c4FF71f3E5"

    const signer = provider.getSigner();
    const [address, _] = await handle(signer.getAddress());
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GrabbyGrackles.abi, signer);
    contract.on("Transfer", (_from, _to, id) => {
        console.log("GOt a transfer!!", _from, _to, id);
        if (_from.toLowerCase() === og_owner_addr) {
            this.photos[id-1]["taken"] = true;
            this.photos[id-1]["price"] = "Not available"
            if (owners[id].localeCompare(address) == 0)
                this.photos[id]["price"] = "Owned"
        }
    });
    let [owners, ownErr] = await handle(contract.getOwners());
    if (ownErr)
        console.log(ownErr);
    console.log(owners);
    let [prices, priceErr] = await handle(contract.getPrices());
    if (priceErr)
        console.log(priceErr);

    for (let id = 0; id < this.photos.length; id++) {
        let taken = og_owner_addr.localeCompare(owners[id].toLowerCase()) != 0;
        this.photos[id]["taken"] = taken
        if (taken) {
            console.log("Taken " + (id + 1));
            this.photos[id]["price"] = "Not available"
            if (owners[id].localeCompare(address) == 0)
                this.photos[id]["price"] = "Owned"
            continue;
        }
        this.photos[id]["price"] = ethers.utils.formatEther(prices[id]) + " MATIC"
    }
  },
  handleAccountsChanged(accounts) {
      console.log(accounts);
      if (accounts.length === 0) {
          this.address = ""
      }
      else if (typeof accounts === "string") {
          this.address = accounts
      } else {
          this.address = accounts[0]
      }
      if (this.address !== '') {
        this.handleConnect().then().catch((e) => console.log(e))
      }
  },
  async getAccount() {
      const [accounts, err] = await handle(ethereum.request({ method: 'eth_accounts' }))
      if (err) {
          console.log(err)
      }
      this.handleAccountsChanged(accounts);
  }
  },
  mounted() {
    if (window.ethereum) {
        ethereum.on('accountsChanged', this.handleAccountsChanged);
        this.handleConnect().then().catch((e) => console.log(e))
    }
  },
  data() {
    return {
      dialog: [],
      alertMessage: "",
      address: "",
      alertOn: false,
      // TODO tripple check id's are correct post launch
      photos: [
        { taken: false, price: "...", id: 1, filename: "/collections/grabby-thumbnail/Airpod Grackle.jpg"},
        { taken: false, price: "...", id: 2, filename: "/collections/grabby-thumbnail/Angry hippie Grackle.jpg"},
        { taken: false, price: "...", id: 3, filename: "/collections/grabby-thumbnail/Art critic Grackle.jpg"},
        { taken: false, price: "...", id: 4, filename: "/collections/grabby-thumbnail/Artsy Grackle.jpg"},
        { taken: false, price: "...", id: 5, filename: "/collections/grabby-thumbnail/Banksy Grackle.jpg"},
        { taken: false, price: "...", id: 6, filename: "/collections/grabby-thumbnail/Blue origin grackle.jpg"},
        { taken: false, price: "...", id: 7, filename: "/collections/grabby-thumbnail/British Judge.jpg"},
        { taken: false, price: "...", id: 8, filename: "/collections/grabby-thumbnail/Cryptopunk Grackle.jpg"},
        { taken: false, price: "...", id: 9, filename: "/collections/grabby-thumbnail/Drunk artist grackle.jpg"},
        { taken: false, price: "...", id: 10, filename: "/collections/grabby-thumbnail/Duty free Grackle.jpg"},
        { taken: false, price: "...", id: 11, filename: "/collections/grabby-thumbnail/Evening Grackle.jpg"},
        { taken: false, price: "...", id: 12, filename: "/collections/grabby-thumbnail/German Grackle.jpg"},
        { taken: false, price: "...", id: 13, filename: "/collections/grabby-thumbnail/Green hat.jpg"},
        { taken: false, price: "...", id: 14, filename: "/collections/grabby-thumbnail/Habanero Grackle.jpg"},
        { taken: false, price: "...", id: 15, filename: "/collections/grabby-thumbnail/Hairdresser bird.jpg"},
        { taken: false, price: "...", id: 16, filename: "/collections/grabby-thumbnail/Invisible Grackle.jpg"},
        { taken: false, price: "...", id: 17, filename: "/collections/grabby-thumbnail/Joe Grackle.jpg"},
        { taken: false, price: "...", id: 18, filename: "/collections/grabby-thumbnail/Longhorns Grackle.jpg"},
        { taken: false, price: "...", id: 19, filename: "/collections/grabby-thumbnail/modern grackle.jpg"},
        { taken: false, price: "...", id: 20, filename: "/collections/grabby-thumbnail/Oktoberfest Grackle.jpg"},
        { taken: false, price: "...", id: 21, filename: "/collections/grabby-thumbnail/Peacock Grackle.jpg"},
        { taken: false, price: "...", id: 22, filename: "/collections/grabby-thumbnail/Questioning Grackle.jpg"},
        { taken: false, price: "...", id: 23, filename: "/collections/grabby-thumbnail/Secret Service Grackle.jpg"},
        { taken: false, price: "...", id: 24, filename: "/collections/grabby-thumbnail/Shaky Crypto Grackle.jpg"},
        { taken: false, price: "...", id: 25, filename: "/collections/grabby-thumbnail/Sheriff Grackle.jpg"},
        { taken: false, price: "...", id: 26, filename: "/collections/grabby-thumbnail/Sherlock Grackle.jpg"},
        { taken: false, price: "...", id: 27, filename: "/collections/grabby-thumbnail/Singing Grackle.jpg"},
        { taken: false, price: "...", id: 28, filename: "/collections/grabby-thumbnail/Tax free Grackle.jpg"},
        { taken: false, price: "...", id: 29, filename: "/collections/grabby-thumbnail/The cat.jpg"},
        { taken: false, price: "...", id: 30, filename: "/collections/grabby-thumbnail/The pirate.jpg"},
        { taken: false, price: "...", id: 31, filename: "/collections/grabby-thumbnail/The puppy Grackle.jpg"},
        { taken: false, price: "...", id: 32, filename: "/collections/grabby-thumbnail/The rebel Grackle.jpg"},
        { taken: false, price: "...", id: 33, filename: "/collections/grabby-thumbnail/The sneeze Grackle.jpg"},
        { taken: false, price: "...", id: 34, filename: "/collections/grabby-thumbnail/Too many drinks Grackle.jpg"},
        { taken: false, price: "...", id: 35, filename: "/collections/grabby-thumbnail/Torchy Grackle.jpg"},
        { taken: false, price: "...", id: 36, filename: "/collections/grabby-thumbnail/Turks cap.jpg"},
        { taken: false, price: "...", id: 37, filename: "/collections/grabby-thumbnail/Twitter Grackle.jpg"},
        { taken: false, price: "...", id: 38, filename: "/collections/grabby-thumbnail/Ukrainian Grackle.jpg"},
        { taken: false, price: "...", id: 39, filename: "/collections/grabby-thumbnail/Viking Grackle.jpg"},
        { taken: false, price: "...", id: 40, filename: "/collections/grabby-thumbnail/VR Grackle.jpg"},
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

.gallery-panel .art .v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}


.gallery-panel .caption {
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
