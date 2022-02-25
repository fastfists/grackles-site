<template>
    <v-card>
      <v-container
        style="display: flex;" >
        <v-img
          class="mr-5"
          max-width="100"
          :src="file_name" />
        <div
          style="display: flex; flex-direction: column"
          >
          <p> {{nft_name}}</p>
          <div style="flex: 1 0 auto"/>
          <p> Cost {{price}} WEI</p>
          <div style="flex: 1 0 auto"/>
          <v-btn
          class="m-0"
          @click="buy">
            Buy this nft
          </v-btn>
        </div>
      </v-container>
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
      console.log(nft_name);
      require("dotenv").config();
      return {
        owner: "",
        uri: "",
        price: "...",
        nft_name: nft_name,
        contract: null,
        signer: null,
      };
    },
    async fetch() {
        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // TODO make dotenv work with this
        const CONTRACT_ADDRESS = "0x0903cc60941A6AC0631836E220e0d74917c77ffe";
        // const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, GrabbyGrackles.abi, signer);
        /* this.owner = await contract.ownerOf(this.id + 1); */
        /* this.uri = await contract.tokenURI(this.id + 1); */
        this.price = await contract.getPrice(this.id + 1);
        this.contract = contract;
        this.signer = signer;
    },
    methods: {
        async buy() {
          /* await window.ethereum.enable() */
          console.log(this.signer.getAddress());
          try {
            await this.contract.buyNFT(await this.signer.getAddress(), this.id + 1, {value: this.price});
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
