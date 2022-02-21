const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contract = NFT.attach(CONTRACT_ADDRESS);
    for (let i = 1; i <= 10; i++) {
        // const owner = await contract.ownerOf(i);
        // console.log("Owner:", owner);
        // const balance = await contract.balanceOf(owner);
        // console.log("Balance: ", balance);
        // const uri = await contract.tokenURI(i);
        // console.log("URI: ", uri);
    }

    await contract.setPrice(1, 5000000000000000);

    var price = await contract.getPrice(2);
    price = price / Math.pow(10, 18);

    console.log("The first token is worth " + price + " eth");
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
