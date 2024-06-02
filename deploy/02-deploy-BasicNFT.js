const { network } = require("hardhat");
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat");
const { verify } = require("../utils/verify");

module.exports = async({getNamedAccounts,deployments})=>{
    const {deployer} = await getNamedAccounts()
    const {deploy,log} = deployments
    const args = []
    const waitConfirmations = developmentChains.includes(network.name)? 1 : VERIFICATION_BLOCK_CONFIRMATIONS
    log("deploying...")
    const BasicNFT = await deploy("BasicNFT",{
        from : deployer,
        args : args ,
        log : true,
        waitConfirmations : waitConfirmations

    }
    )
    
    log("deployed")


}
module.exports.tags = ["all","basicNft"]