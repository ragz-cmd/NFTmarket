const { network } = require("hardhat");
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const args = [];
  const waitConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;
  log("deploying...");
  const nftMarket = await deploy("NFTmarket", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitConfirmations,
  });
  if (!developmentChains.includes(network.name)) {
    log("verifying...");
    await verify(deploy.address, args);
  }
  log(`deployed on ${nftMarket.address}`);
};
module.exports.tags = ["all", "nftMarket"];
