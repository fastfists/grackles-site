require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// TODO Add .env file and place metamask private key inside
const PRIVATE_KEY = process.env.PRIVATE_KEY

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "matic",
    networks: {
        hardhat : {
        },
        matic: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts: ["29784bc06418dcf832968aba1f4580b5c96b32789098e60ac1f41a698c9c3086"]
        }
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    paths: {
        sources: "./contracts/",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 20000,
    }
};
