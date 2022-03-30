const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests should be ran on localhost test network
// Run command `npx hardhat test --network localhost` to test this code
describe("GrackleNFT", function () {
    it("Should mint and transfer an NFT to someone", async function() {
        const NFT = await ethers.getContractFactory("GrabbyGrackles");

        const grabbyGrackles = await NFT.deploy();
        await grabbyGrackles.deployed();

        const ogOwner = "0xBCF024D6C66245AEE0bCE42df080Dc9Adbf0B1ae"; // Get this user from localhost server
        const metadataURI = "cid/test.png";
        const price = ethers.utils.parseEther('0.000005');

        let balance = await grabbyGrackles.balanceOf(ogOwner);
        
        expect(balance).to.equal(0);

        console.log("Begining mint");
        let newToken = await grabbyGrackles.mint(ogOwner, metadataURI, price);
        console.log(1);
        // await newToken.wait();
        newToken = await grabbyGrackles.mint(ogOwner, metadataURI, price);
        console.log(2);
        // await newToken.wait();
        newToken = await grabbyGrackles.mint(ogOwner, metadataURI, price);
        console.log(3);
        // await newToken.wait();
        console.log(await grabbyGrackles.getOwners());
        let newBalance = await grabbyGrackles.balanceOf(ogOwner);
        expect(newBalance).to.equal(3);

        console.log("Minting all");

        const otherOwner = "0x63B060a3E5a89308DB2Da5D16429AB01A65e29D8"; // Get this user from localhost network

        let p = await grabbyGrackles.getPrice(1);
        expect(p).to.equal(price);

        let resp = await grabbyGrackles.buyNFT(otherOwner, 1, {value: price});
        await resp.wait();
        let balOG = await grabbyGrackles.balanceOf(ogOwner);
        let balOt = await grabbyGrackles.balanceOf(otherOwner);
        console.log(await grabbyGrackles.getOwners());

        expect(balOG).to.equal(2);
        expect(balOt).to.equal(1);
    });
});
