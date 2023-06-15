import { ethers, network } from "hardhat"
import { developmentChains } from "../../hardhat-helper"
import { NFTMarketplace, WalkingMan } from "../../typechain-types"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("staging test", function () {
          it("NFTMarketplace", async function () {
              const walkingman: WalkingMan = await ethers.getContract(
                  "WalkingMan"
              )

              const mintTxRsp = await walkingman.safeMint({
                  value: ethers.utils.parseEther("0.001"),
              })
              const txReceipt = await mintTxRsp.wait(1)
              const tokenId = txReceipt.events![0].args![2]
              console.log(`successfully mint #${tokenId}`)

              const nftMarketplace: NFTMarketplace = await ethers.getContract(
                  "NFTMarketplace"
              )
              const approveTxRsp = await walkingman.approve(
                  nftMarketplace.address,
                  tokenId
              )
              await approveTxRsp.wait(1)
              console.log(`successfully approve #${tokenId}`)

              const listItemRsp = await nftMarketplace.listItem(
                  walkingman.address,
                  tokenId,
                  ethers.utils.parseEther("0.001")
              )
              await listItemRsp.wait(1)
              console.log(`successfully listItem #${tokenId}`)

              const updateListingRsp = await nftMarketplace.updateListing(
                  walkingman.address,
                  tokenId,
                  ethers.utils.parseEther("0.002")
              )
              await updateListingRsp.wait(1)
              console.log(`successfully updateItem #${tokenId}`)

              const cancelListing = await nftMarketplace.cancelListing(
                  walkingman.address,
                  tokenId
              )
              await cancelListing.wait()
              console.log(`successfully cancelListing #${tokenId}`)

              const listItemRsp2 = await nftMarketplace.listItem(
                  walkingman.address,
                  tokenId,
                  ethers.utils.parseEther("0.001")
              )
              await listItemRsp2.wait(1)
              console.log(`successfully re-listItem #${tokenId}`)

              const accounts = await ethers.getSigners()
              console.log(accounts)
              nftMarketplace.connect(accounts[1])
              const buyItemRsp = await nftMarketplace.buyItem(
                  walkingman.address,
                  tokenId,
                  {
                      value: ethers.utils.parseEther("0.001"),
                  }
              )
              await buyItemRsp.wait()
              console.log(`successfully buyItem #${tokenId}`)

              nftMarketplace.connect(accounts[0])
              ;(await nftMarketplace.withdraw()).wait(1)
              console.log(`successfully withdraw`)
          })
      })
