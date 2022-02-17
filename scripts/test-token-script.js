const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contract = NFT.attach(CONTRACT_ADDRESS);
    for (let i = 1; i <= 4; i++) {
        const owner = await contract.ownerOf(i);
        console.log("Owner:", owner);
        const uri = await contract.tokenURI(i);
        console.log("URI: ", uri);
    }
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
