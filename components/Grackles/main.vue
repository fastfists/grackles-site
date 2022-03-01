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
             width="300"
             >
             <template v-slot:activator="{on}">
                <div class="art">
                    <img
                      style="cursor: pointer;"
                      v-if="!photo.taken"
                      v-on="on"
                      :src="photo.filename" />
                    <img
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
                      disabled="true">
                        Buy this nft
                      </v-btn>
                      <div>
                        {{photo.price}}
                      </div>
                    </div>
                </div>
             </template>
             <GracklesSingle :connected="address !== ''" :id="photo.id" :file_name="photo.filename" :onBuy="() => {onPurchase(index); alertOn =true; dialog[index] = false}" />
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
    this.connected = true
    // TODO update on change
    const CONTRACT_ADDRESS = "0xAA8AA8B751c3a120cfc6cF498FBd0de9F5528f48"
    const signer = provider.getSigner();
    const [address, err] = await handle(signer.getAddress());
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GrabbyGrackles.abi, signer);
    contract.on("Transfer", (_from, _to, tokenID) => {
        if (_from.toLowerCase() === og_owner_addr) {
            let id = tokenID - 1; // Convert from id to index
            this.photos[id]["taken"] = true;
            this.photos[id]["price"] = "Not available"
        }
    });
    for (let id = 0; id < this.photos.length; id++) {
        let [owner, ownErr] = await handle(contract.ownerOf(id + 1))
        if (ownErr) {
            console.log(ownErr.data);
            continue;
        }
        let taken = og_owner_addr.localeCompare(owner.toLowerCase()) != 0;
        this.photos[id]["taken"] = taken
        if (taken) {
            this.photos[id]["price"] = "Not available"
            if (owner.toLowerCase().localeCompare(signer) == 0)
                this.photos[id]["price"] = "Owned"
            continue;
        }

        let [price, priceErr] = await handle(contract.getPrice(id +1))
        if (priceErr) {
            conosle.log(priceErr.data);
            continue;
        }
        this.photos[id]["price"] = ethers.utils.formatEther(price) + " MATIC"
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
      if (this.address !== '' && this.noFetch) {
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
        this.handleConnect().then().catch((e) => console.log(e))
        ethereum.on('accountsChanged', this.handleAccountsChanged);
    }
  },
  data() {
    return {
      dialog: [],
      alertMessage: "",
      address: "",
      noFetch: false,
      alertOn: false,
      // TODO tripple check id's are correct post launch
      photos: [
        { taken: false, price: "...", id: 1, filename: "/collections/grabby/Airpod Grackle.jpg"},
        { taken: false, price: "...", id: 2, filename: "/collections/grabby/Angry hippie Grackle.jpg"},
        { taken: false, price: "...", id: 3, filename: "/collections/grabby/Art critic Grackle.jpg"},
        { taken: false, price: "...", id: 4, filename: "/collections/grabby/Artsy Grackle.jpg"},
        { taken: false, price: "...", id: 5, filename: "/collections/grabby/Banksy Grackle.jpg"},
        { taken: false, price: "...", id: 6, filename: "/collections/grabby/Blue origin grackle.jpg"},
        { taken: false, price: "...", id: 7, filename: "/collections/grabby/British Judge.jpg"},
        { taken: false, price: "...", id: 8, filename: "/collections/grabby/Cryptopunk Grackle.jpg"},
        { taken: false, price: "...", id: 9, filename: "/collections/grabby/Drunk artist grackle.jpg"},
        { taken: false, price: "...", id: 10, filename: "/collections/grabby/Duty free Grackle.jpg"},
        { taken: false, price: "...", id: 11, filename: "/collections/grabby/Evening Grackle.jpg"},
        { taken: false, price: "...", id: 12, filename: "/collections/grabby/German Grackle.jpg"},
        { taken: false, price: "...", id: 13, filename: "/collections/grabby/Green hat.jpg"},
        { taken: false, price: "...", id: 14, filename: "/collections/grabby/Habanero Grackle.jpg"},
        { taken: false, price: "...", id: 15, filename: "/collections/grabby/Hairdresser bird.jpg"},
        { taken: false, price: "...", id: 16, filename: "/collections/grabby/Invisible Grackle.jpg"},
        { taken: false, price: "...", id: 17, filename: "/collections/grabby/Joe Grackle.jpg"},
        { taken: false, price: "...", id: 18, filename: "/collections/grabby/Longhorns Grackle.jpg"},
        { taken: false, price: "...", id: 19, filename: "/collections/grabby/modern grackle.jpg"},
        { taken: false, price: "...", id: 20, filename: "/collections/grabby/Oktoberfest Grackle.jpg"},
        { taken: false, price: "...", id: 21, filename: "/collections/grabby/Peacock Grackle.jpg"},
        { taken: false, price: "...", id: 22, filename: "/collections/grabby/Questioning Grackle.jpg"},
        { taken: false, price: "...", id: 23, filename: "/collections/grabby/Secret Service Grackle.jpg"},
        { taken: false, price: "...", id: 24, filename: "/collections/grabby/Shaky Crypto Grackle.jpg"},
        { taken: false, price: "...", id: 25, filename: "/collections/grabby/Sheriff Grackle.jpg"},
        { taken: false, price: "...", id: 26, filename: "/collections/grabby/Sherlock Grackle.jpg"},
        { taken: false, price: "...", id: 27, filename: "/collections/grabby/Singing Grackle.jpg"},
        { taken: false, price: "...", id: 28, filename: "/collections/grabby/Tax free Grackle.jpg"},
        { taken: false, price: "...", id: 29, filename: "/collections/grabby/The cat.jpg"},
        { taken: false, price: "...", id: 30, filename: "/collections/grabby/The pirate.jpg"},
        { taken: false, price: "...", id: 31, filename: "/collections/grabby/The puppy Grackle.jpg"},
        { taken: false, price: "...", id: 32, filename: "/collections/grabby/The rebel Grackle.jpg"},
        { taken: false, price: "...", id: 33, filename: "/collections/grabby/The sneeze Grackle.jpg"},
        { taken: false, price: "...", id: 34, filename: "/collections/grabby/Too many drinks Grackle.jpg"},
        { taken: false, price: "...", id: 35, filename: "/collections/grabby/Torchy Grackle.jpg"},
        { taken: false, price: "...", id: 36, filename: "/collections/grabby/Turks cap.jpg"},
        { taken: false, price: "...", id: 37, filename: "/collections/grabby/Twitter Grackle.jpg"},
        { taken: false, price: "...", id: 38, filename: "/collections/grabby/Ukrainian Grackle.jpg"},
        { taken: false, price: "...", id: 39, filename: "/collections/grabby/Viking Grackle.jpg"},
        { taken: false, price: "...", id: 40, filename: "/collections/grabby/VR Grackle.jpg"},
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

.gallery-panel .art img {
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
