<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialog[index] = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row
      class="mb-6"
    >
      <v-col md="6">
        <div
          
        >
          <v-img class="mr-5"
              max-width=100%
              :src="file_name" />
        </div>
      </v-col>
      <v-col
        md="6"
      >
          <div>
            <h1
            
                    >
                      Name of the Grackle
                    </h1>
          </div>
          <div >
            <div title="0.059 ETH" data-currency-symbol="ETH"  data-price="0.059" >0.05 ETH</div>
              <span
              >
                Here supposed to show the description of the NFT
                
              </span>
              </div>
      </v-col>
    </v-row>
      <!-- <v-container v-if="connected" style="display: flex;" >

      </v-container> -->
  </v-card>
</template>

<script>
import { ethers } from 'ethers'
import GrabbyGrackles from '../../artifacts/contracts/GrackleNFT.sol/GrabbyGrackles.json'
import path from 'path'

export default {
  props: {
    id: Number,
    file_name: String,
    onBuy: Function,
  },
  data() {
    let extension = path.extname(this.file_name)
    let nft_name = path.basename(this.file_name, extension)
    let connected = window.ethereum.isConnected()
    return {
      notifications: false,
      sound: true,
      widgets: false,
      uri: '',
      price: '...',
      nft_name: nft_name,
      contract: null,
      signer: null,
      connected: connected,
    }
  },
  async fetch() {
    // Not sure when to connect to wallet
    if (this.connected) {
      await this.setup()
    }
  },
  watch: {
    connected: async function (val) {
      console.log(val)
      if (val) await this.setup()
    },
  },
  methods: {
    async setup() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // TODO make dotenv work with this
      const CONTRACT_ADDRESS = '0xAA8AA8B751c3a120cfc6cF498FBd0de9F5528f48'
      // const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
      const signer = provider.getSigner()

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        GrabbyGrackles.abi,
        signer,
      )
      /* this.uri = await contract.tokenURI(this.id); */
      this.price = await contract.getPrice(this.id)
      this.contract = contract
      this.signer = signer
    },
    async buy() {
      /* await window.ethereum.enable() */
      try {
        await this.contract.buyNFT(await this.signer.getAddress(), this.id, {
          value: this.price,
        })
        this.onBuy()
      } catch (e) {
        if (e.code === 4001) {
          alert('you reject the transaction')
        } else if (e.code === -32603) {
          alert(e.data.message)
        }
        console.log('Error ')
        console.log(e)
        console.log(e.data)
      }
    },
  },
}
</script>

<style >
  .dHTmnQ {
    right: 400px;
    vertical-align: inherit;
    max-width: 100%;
    min-height: 0px;
    min-width: 0px;
    flex-shrink: 0;
    flex-direction: column;
    flex-basis: auto;
    display: flex;
    -webkit-box-align: stretch;
    align-items: stretch;
  }
  .kSlkRV {
    position: fixed;
    bottom: 0px;
    left: 0px;
    padding: 32px 0px;
    z-index: 10;
    -webkit-box-flex: 1;
    flex-grow: 1;
}
.dqnTGd {
    border-width: 0px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
}
</style>
