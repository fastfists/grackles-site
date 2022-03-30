const hre = require("hardhat");
require("dotenv").config();

async function main() {
    let token_id = 3;
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contract = NFT.attach(CONTRACT_ADDRESS);
    console.log(await contract.getOwners());

    console.log("Before Buy");
    console.log(await contract.ownerOf(token_id));

    console.log("Buying");
    const price = contract.getPrice(token_id)
    var addr = "0xBCF024D6C66245AEE0bCE42df080Dc9Adbf0B1ae"
    var resp = await contract.buyNFT(addr, token_id, {value: price});
    await resp.wait();

    console.log("After Buy");
    console.log(await contract.ownerOf(token_id));
    console.log(await contract.getOwners());
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
