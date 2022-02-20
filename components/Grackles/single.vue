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
          <p> {{nft_name}} </p>
          <div style="flex: 1 0 auto"/>
          <v-btn
          class="m-0"
            >
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
        cost: Number,
    },
    data() {
      let extension = path.extname(this.file_name);
      let nft_name = path.basename(this.file_name,extension);
      console.log(nft_name);
      return {
        owner: "",
        uri: "",
        nft_name: nft_name,
      };
    },
    async fetch() {
        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const CONTRACT_ADDRESS = "0x211A99316aD15181dCFD47a45f9f2fD6601AD258";
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, GrabbyGrackles.abi, signer);

        console.log("id " + this.id)
        this.owner = await contract.ownerOf(this.id + 1);
        this.uri = await contract.tokenURI(this.id + 1)

        /* this.owner = "oh oh"; */
        /* this.uri   = "hi hi"; */

    }
};
</script>
