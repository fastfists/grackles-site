<template>
    <v-card>
      <v-container v-if="connected" style="display: flex;" >
            <v-img class="mr-5"
              max-width="100"
              :src="file_name" />
            <div style="display: flex; flex-direction: column">
              <p> {{nft_name}}</p>
              <div style="flex: 1 0 auto"/>
              <p> Cost {{price/ 1000000000000000000}} MATIC </p>
              <div style="flex: 1 0 auto"/>
                  <v-btn
                  class="m-0"
                  @click="buy">
                    Buy this nft
              </v-btn>
            </div>
      </v-container>
      <div v-else>
            Please connect your metamask wallet
      </div>
    </v-card>

</template>


<script>
import { ethers } from "ethers";
import GrabbyGrackles from "../../artifacts/contracts/GrackleNFT.sol/GrabbyGrackles.json";
import path from "path";

export default {
    props: {
        id: Number,
        file_name: String,
    },
    data() {
      let extension = path.extname(this.file_name);
      let nft_name = path.basename(this.file_name,extension);
      let connected = window.ethereum.isConnected();
      return {
        owner: "",
        uri: "",
        price: "...",
        nft_name: nft_name,
        contract: null,
        signer: null,
        connected: connected,
      };
    },
    async fetch() {
        // Not sure when to connect to wallet
        if (this.connected) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // TODO make dotenv work with this
            const CONTRACT_ADDRESS = "0x0903cc60941A6AC0631836E220e0d74917c77ffe";
            // const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
            const signer = provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, GrabbyGrackles.abi, signer);
            /* this.uri = await contract.tokenURI(this.id); */
            this.price = await contract.getPrice(this.id);
            this.contract = contract;
            this.signer = signer;
            owner = await contract.ownerOf(this.id);
            this.buyable = owner
        }
    },
    methods: {
        async buy() {
          /* await window.ethereum.enable() */
          try {
            await this.contract.buyNFT(await this.signer.getAddress(), this.id, {value: this.price});
            alert("YOU bought the NFT stuffs");
          } catch(e) {
            if (e.code === 4001){
              alert("you reject the transaction")
            }
            console.log(e.data);
          }
        }
    }
};
</script>
