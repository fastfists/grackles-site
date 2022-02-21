const hre = require("hardhat");

async function main() {
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");

    const contract = NFT.attach(process.env.CONTRACT_ADDRESS);

    await contract.setPrice(1, 500000000);

    const price = await contract.getPrice(1);

    console.log("The first token is worth " + price + " eth");
}