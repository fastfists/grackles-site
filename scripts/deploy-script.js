const hre = require("hardhat");

async function main() {
    const NFT = await ethers.getContractFactory("GrabbyGrackles");
    const nft = await NFT.deploy();  await nft.deployed();
    console.log("NFT deployed to:", nft.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
