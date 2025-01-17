const hre = require("hardhat");

base_uri = "ipfs://QmWh7jVBZ4UiNq7fZvuTSq6rnUcTYk5EDKYRcN5Eg7PQor/"
// If you change the ORDER please reflect the change in the gracklesMain component
images_to_uri = [
    "Airpod Grackle.jpg",
    "Angry hippie Grackle.jpg",
    "Art critic Grackle.jpg", //
    "Artsy Grackle.jpg", //
    "Banksy Grackle.jpg",
    "Blue origin grackle.jpg",
    "British Judge.jpg", //
    "Cryptopunk Grackle.jpg",
    "Drunk artist grackle.jpg",
    "Duty free Grackle.jpg",
    "Evening Grackle.jpg",
    "German Grackle.jpg",
    "Green hat.jpg",
    "Habanero Grackle.jpg",
    "Hairdresser bird.jpg",
    "Invisible Grackle.jpg",
    "Joe Grackle.jpg",
    "Longhorns Grackle.jpg",
    "modern grackle.jpg",
    "Oktoberfest Grackle.jpg",
    "Peacock Grackle.jpg",
    "Questioning Grackle.jpg",
    "Secret Service Grackle.jpg",
    "Shaky Crypto Grackle.jpg",
    "Sheriff Grackle.jpg",
    "Sherlock Grackle.jpg",
    "Singing Grackle.jpg",
    "Tax free Grackle.jpg",
    "The cat.jpg",
    "The pirate.jpg",
    "The puppy Grackle.jpg",
    "The rebel Grackle.jpg",
    "The sneeze Grackle.jpg",
    "Too many drinks Grackle.jpg",
    "Torchy Grackle.jpg",
    "Turks cap.jpg", //
    "Twitter Grackle.jpg", //
    "Ukrainian Grackle.jpg",
    "Viking Grackle.jpg",
    "VR Grackle.jpg"
]

const price = "50000000000000000" // 0.05 MATIC
async function main() {
    const NFT = await ethers.getContractFactory("GrabbyGrackles");
    const nft = await NFT.deploy();  await nft.deployed();
    const WALLET_ADDRESS = "0x4aA35719EA06fEab07a349D9Cf93ebe0Ca77BaBd"
    console.log("NFT deployed to:", nft.address);
    const contract = NFT.attach(nft.address);
    for (let i = 0; i < images_to_uri.length; i++) {
        await contract.mint(WALLET_ADDRESS, base_uri+images_to_uri[i], price);
    }
    console.log("NFTs minted");
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
