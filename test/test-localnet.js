const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests should be ran on localhost test network
// Run command `npx hardhat test --network localhost` to test this code
describe("GrackleNFT", function () {
    it("Should mint and transfer an NFT to someone", async function() {
        const NFT = await ethers.getContractFactory("GrabbyGrackles");

        const grabbyGrackles = await NFT.deploy();
        await grabbyGrackles.deployed();

        const ogOwner = "0xbda5747bfd65f08deb54cb465eb87d40e51b197e"; // Get this user from localhost server
        const metadataURI = "cid/test.png";
        const price = 0;

        let balance = await grabbyGrackles.balanceOf(ogOwner);
        
        expect(balance).to.equal(0);

        let newToken = await grabbyGrackles.mint(ogOwner, metadataURI, price);
        await newToken.wait();
        let newBalance = await grabbyGrackles.balanceOf(ogOwner);
        expect(newBalance).to.equal(1);

        const otherOwner = "0xa0ee7a142d267c1f36714e4a8f75612f20a79720"; // Get this user from localhost network

        let p = await grabbyGrackles.getPrice(1);
        expect(p).to.equal(price);

        let resp = await grabbyGrackles.buyNFT(otherOwner, 1, {value: price});
        await resp.wait();
        let balOG = await grabbyGrackles.balanceOf(ogOwner);
        let balOt = await grabbyGrackles.balanceOf(otherOwner);

        expect(balOG).to.equal(0);
        expect(balOt).to.equal(1);
    });
});
