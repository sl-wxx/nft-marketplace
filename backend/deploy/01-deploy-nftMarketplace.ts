import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import { developmentChains } from "../hardhat-helper"

const deployNFTMarketplace: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deployer } = await getNamedAccounts()
    const deployResult = await deployments.deploy("NFTMarketplace", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })

    if (!developmentChains.includes(network.name)) {
        await verify(deployResult.address, [])
    }
}

deployNFTMarketplace.tags = ["all", "nftMarketplace"]
export default deployNFTMarketplace
