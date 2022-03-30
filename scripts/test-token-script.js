const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contract = NFT.attach(CONTRACT_ADDRESS);
    console.log(await contract.getPrices());
    console.log(await contract.getOwners());
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
