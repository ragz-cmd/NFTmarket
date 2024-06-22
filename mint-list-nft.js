require("dotenv").config()
const { ethers } = require("hardhat")
const fs = require("fs")

// Load ABI files
const basicAbiPath = "./artifacts/contracts/BasicNFT.sol/BasicNFT.json"
const nftAbiPath = "./artifacts/contracts/NFTmarket.sol/NFTmarket.json"

// Ensure ABI files exist
if (!fs.existsSync(basicAbiPath) || !fs.existsSync(nftAbiPath)) {
    console.error("ABI file not found. Please check the path.")
    process.exit(1)
}

const basicAbi = require(basicAbiPath).abi
const nftAbi = require(nftAbiPath).abi

// Contract addresses
const basicNftAdd = "0xF2092270A1aF244Cf120f9E485a36534c894BcA4"
const nftMarketAdd = "0xdbE059c9EF62688D65b535e11db2d28f7A4A29F5"

async function main() {
    const PRICE = ethers.utils.parseEther("0.1")

    // Get the signer
    const [signer] = await ethers.getSigners()

    // Log signer address for debugging
    console.log("Using signer address:", signer.address)

    // Get contract instances
    const basicNft = await ethers.getContractAt(basicAbi, basicNftAdd, signer)
    const nftMarket = await ethers.getContractAt(nftAbi, nftMarketAdd, signer)

    // Check if the mintNft function exists
    if (typeof basicNft.mintNft !== "function") {
        console.error("mintNft function does not exist on the basicNft contract.")
        process.exit(1)
    }

    try {
        // // Mint the NFT
        // console.log("Minting NFT...")
        // const mintTx = await basicNft.mintNft({ gasLimit: 500000 })
        // await mintTx.wait()

        // // Get the token ID
        console.log("Getting token ID...")
        const tokenId = (await basicNft.getTokenCounter()) - 1

        // Approve the NFT marketplace to transfer the token
        console.log("Approving marketplace...")
        const approveTx = await basicNft.approve(nftMarket.address, tokenId, { gasLimit: 500000 })
        await approveTx.wait()

        // List the item on the marketplace
        console.log("Listing item...")
        const listTx = await nftMarket.listItem(basicNft.address, tokenId, PRICE, {
            gasLimit: 500000,
        })
        await listTx.wait()

        console.log("NFT listed with token ID:", tokenId.toString())
    } catch (error) {
        console.error("Error during transaction:", error)
    }
}

main().catch((error) => {
    console.error("Error in script:", error)
    process.exit(1)
})
