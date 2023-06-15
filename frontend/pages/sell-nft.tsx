import type { NextPage } from "next"
import "dotenv/config"
import { Button, useNotification } from "@web3uikit/core"
import {
    useWeb3Contract,
    useMoralis,
    useNFTBalances,
    useChain,
    useMoralisQuery,
} from "react-moralis"
import Moralis from "moralis"
import {
    EvmChain,
    EvmNft,
    GetWalletNFTsResponseAdapter,
} from "@moralisweb3/common-evm-utils"

import abis from "../../abis/abis"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import NFTBox from "../components/NFTBox"

const SellNft: NextPage = () => {
    const dispatch = useNotification()
    const { account } = useMoralis()
    const { chainId } = useChain()

    // @ts-ignore
    const { runContractFunction } = useWeb3Contract()

    const [availableProceeds, setAvailableProceeds] = useState<
        BigNumber | undefined
    >(undefined)

    const [nfts, setNfts] = useState<GetWalletNFTsResponseAdapter>()

    const { data: listedNfts, isFetching: fetchingListedNfts } =
        useMoralisQuery("ActiveItem", (query) =>
            query.equalTo("seller", account).descending("tokenId")
        )

    let nftMarketplace: any = {}

    useEffect(() => {
        const fetchAvailableProceeds = async () => {
            const options = {
                abi: nftMarketplace.abi,
                contractAddress: nftMarketplace.address,
                functionName: "balanceOf",
                params: {
                    seller: account,
                },
            }

            const result = await runContractFunction({
                params: options,
            })

            setAvailableProceeds(result as BigNumber)
        }
        if (nftMarketplace.abi && nftMarketplace.address && account) {
            fetchAvailableProceeds()
        }

        // Get NFT balances
        const fetchOwnedNFTs = async () => {
            console.log(`Moralis.Core.isStated = ${Moralis.Core.isStarted}`)
            if (!Moralis.Core.isStarted) {
                console.log(
                    `moralis start executed: apiKey= ${process.env.MORALIS_API_KEY}, ${process.env.AAA}, ${process.env.NEXT_PUBLIC_SUBGRAPH_URL}`
                )
                await Moralis.start({
                    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQ1MTUxNDMxLTVhYmQtNDE5Yy1hYzU2LTUyYTEwMjUzZmVjOSIsIm9yZ0lkIjoiMzQzMDA2IiwidXNlcklkIjoiMzUyNjEyIiwidHlwZUlkIjoiZTRkMTdkNTYtNDY2Mi00YTIyLTgxMjAtYzNiNDUyNTQxMmQ4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODY2MjY4MjIsImV4cCI6NDg0MjM4NjgyMn0.EPwAe_xhwNHUmduNjdFh08pcN17HdaGaD8IczEVbGJo",
                    // ...and any other configuration
                })
            }

            if (chainId && account) {
                const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
                    address: account!,
                    chain: EvmChain.create(chainId!),
                })
                setNfts(nfts)
            }
        }
        fetchOwnedNFTs()
    }, [account, chainId])

    if (!account || !chainId) {
        return <div>You should connect wallet first.</div>
    }

    const currentNetworkMapping: any =
        abis[parseInt(chainId).toString() as keyof typeof abis]
    if (!currentNetworkMapping) {
        const error = `No entry in networkMapping.json matching the current chain ID of ${chainId}`
        return <div>Error: {error}</div>
    }

    nftMarketplace = currentNetworkMapping[0].contracts.NFTMarketplace

    const handleWithdraw = async () => {
        const options = {
            abi: nftMarketplace.abi,
            contractAddress: nftMarketplace.address,
            functionName: "withdrawProceeds",
        }

        await runContractFunction({
            params: options,
            onSuccess: handleWithdrawSuccess,
        })
    }

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "Proceeds withdrawn successfully",
            title: "Proceeds Withdrawn",
            position: "topR",
        })
    }

    const hasNonZeroAvailableProceeds =
        availableProceeds !== undefined && !availableProceeds.isZero()

    const getSellerAndPrice = (nftAddress: string, tokenId: string) => {
        const matchingListing = listedNfts.find((nft) => {
            const {
                nftAddress: comparisonNftAdreess,
                tokenId: comparisonTokenId,
            } = nft.attributes

            return (
                nftAddress === comparisonNftAdreess &&
                tokenId === comparisonTokenId
            )
        })

        return matchingListing
            ? {
                  seller: matchingListing.attributes.seller,
                  price: matchingListing.attributes.price,
              }
            : {
                  seller: undefined,
                  price: undefined,
              }
    }

    return (
        <div className="container mx-auto">
            <div className="py-4">
                <h2 className="text-2xl">Your NFTs</h2>
                <div className="flex flex-wrap">
                    {nfts?.result?.map((nft: EvmNft) => {
                        const { seller, price } = getSellerAndPrice(
                            nft.tokenAddress.lowercase,
                            nft.tokenId.toString()
                        )

                        return (
                            <NFTBox
                                key={
                                    nft.tokenAddress.lowercase +
                                    nft.tokenId.toString()
                                }
                                nftAddress={nft.tokenAddress.lowercase}
                                nftMarketplaceAddress={nftMarketplace.address}
                                tokenId={nft.tokenId.toString()}
                                seller={seller}
                                price={price}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="py-4">
                <div className="flex flex-col gap-2 justify-items-start w-fit">
                    <h2 className="text-2xl">Withdraw proceeds</h2>
                    {hasNonZeroAvailableProceeds ? (
                        <p>
                            Sales proceeds available for withdrawal:{" "}
                            {ethers.utils.formatEther(
                                availableProceeds as BigNumber
                            )}{" "}
                            ЕТH
                        </p>
                    ) : (
                        <p>No withdrawable proceeds detected</p>
                    )}
                    <Button
                        disabled={!hasNonZeroAvailableProceeds}
                        id="withdraw-proceeds"
                        onClick={handleWithdraw}
                        text="Withdraw"
                        theme="primary"
                        type="button"
                    />
                </div>
            </div>
        </div>
    )
}
export default SellNft
