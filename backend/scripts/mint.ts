import { ethers, getNamedAccounts } from "hardhat"
import { WalkingMan } from "../typechain-types"

async function main() {
    const { deployer: minter } = await getNamedAccounts()
    const walkingman: WalkingMan = await ethers.getContract(
        "WalkingMan",
        minter
    )
    const txRsp = await walkingman.safeMint({
        value: ethers.utils.parseEther("0.1"),
    })
    await txRsp.wait(1)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
