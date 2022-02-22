const hre = require("hardhat");
require("dotenv").config();

async function main() {
    let token_id = 2;
    const NFT = await hre.ethers.getContractFactory("GrabbyGrackles");
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contract = NFT.attach(CONTRACT_ADDRESS);
    for (let i = 1; i <= token_id; i++) {
        const owner = await contract.ownerOf(i);
        console.log("Owner:", owner);
        const balance = await contract.getPrice(i);
        console.log("Balance: ", balance);
        const uri = await contract.tokenURI(i);
        console.log("URI: ", uri);
    }

    console.log("Before Buy");
    console.log(await contract.ownerOf(token_id));
    console.log(await contract.getPrice(token_id));
    console.log(await contract.setPrice(token_id, 5000)); // Should not get changed
    console.log(await contract.getPrice(token_id));

    // await contract.buyNFT(token_id);

    console.log("After Buy");
    console.log(await contract.getPrice(token_id));
    console.log(await contract.ownerOf(token_id));
    await contract.setPrice(token_id, 5)
    console.log(await contract.getPrice(token_id));
    console.log(await contract.getPrice(token_id));

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
