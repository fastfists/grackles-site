const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const contract = NFT.attach(process.env.CONTRACT_ADDRESS);
    await contract.setPrice(1, 5);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
