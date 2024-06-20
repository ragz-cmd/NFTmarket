const { network, ethers, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BasicNFt tests", function () {
      let deployer, basicNFT, minter;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        minter = accounts[0];
        await deployments.fixture(["basicNft"]);
        const myContract = await deployments.get("BasicNFT");
        basicNFT = await ethers.getContractAt(
          myContract.abi,
          myContract.address
        );
      });
      describe("mints nft", function () {
        let token;
        beforeEach(async () => {
          token = await basicNFT.mintNft();
          await token.wait(1);
        });

        it("mints nft and updates counter", async () => {
          const t = ethers.utils.formatEther(token.value);
          const uri = await basicNFT.tokenURI(
            ethers.utils.parseEther(t.toString())
          );
          const counter = await basicNFT.getTokenCounter();
          assert.equal(uri, process.env.TOKEN_URI, "uri");
          assert.equal(counter.toString(), "1");
        });
        it("Show the correct balance and owner of an NFT", async function () {
          const deployerAddress = deployer.address;
          const deployerBalance = await basicNFT.balanceOf(deployerAddress);
          const owner = await basicNFT.ownerOf("0");

          assert.equal(deployerBalance.toString(), "1");
          assert.equal(owner, deployerAddress);
        });
      });
    });
