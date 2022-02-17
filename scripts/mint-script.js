const hre = require("hardhat");


base_uri = "ipfs://QmWh7jVBZ4UiNq7fZvuTSq6rnUcTYk5EDKYRcN5Eg7PQor/"
images_to_uri = [
    "Airpod Grackle.jpg",
    "Angry hippie Grackle.jpg",
    "Art critic Grackle.jpg",
    "Artsy Grackle.jpg",
    "Banksy Grackle.jpg",
    "Blue origin grackle.jpg",
    "British Judge.jpg",
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
    "Turks cap.jpg",
    "Twitter Grackle.jpg",
    "Ukrainian Grackle.jpg",
    "Viking Grackle.jpg",
    "VR Grackle.jpg",
]

async function main() {
    const NFT = await ethers.getContractFactory("GrabbyGrackles");
    const WALLET_ADDRESS = "0x63B060a3E5a89308DB2Da5D16429AB01A65e29D8"
    const CONTRACT_ADDRESS = "0x1Ebc8756d71735A122F622ADf589E46E9cdffcd9"
    const contract = NFT.attach(CONTRACT_ADDRESS);
    for (let i = 0; i < images_to_uri.length; i++) {
        await contract.mint(WALLET_ADDRESS, base_uri+images_to_uri[i]["uri"]);
    }
    console.log("NFT minted:", contract);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
