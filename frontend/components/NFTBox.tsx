import type { NextPage } from "next"
import {
    Card,
    Tooltip,
    Illustration,
    Modal,
    useNotification,
    Input,
    Button,
} from "@web3uikit/core"
import abis from "../../abis/abis"

import { useMoralis, useWeb3Contract } from "react-moralis"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { SellNFTModal } from "./SellNFTModal"
import { UpdateListingModal } from "./UpdateListingModal"

interface NFTBoxProps {
    price?: number
    nftAddress: string
    tokenId: string
    nftMarketplaceAddress: string
    seller?: string
}

const truncateStr = (fullStr: string, strLen: number) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)

    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

const NFTBox: NextPage<NFTBoxProps> = ({
    price,
    nftAddress,
    tokenId,
    nftMarketplaceAddress,
    seller,
}: NFTBoxProps) => {
    console.log(nftMarketplaceAddress)
    const { chainId, network, isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState<string | undefined>()
    const [tokenName, setTokenName] = useState<string | undefined>()
    const [tokenDescription, setTokenDescription] = useState<
        string | undefined
    >()
    // State to handle display of 'create listing' or 'update listing' modal
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const isListed = seller !== undefined

    const dispatch = useNotification()

    const contracts: any =
        abis[parseInt(chainId || "11155111").toString() as keyof typeof abis][0]
            .contracts
    const { runContractFunction: getTokenURI, data: tokenURI } =
        useWeb3Contract({
            abi: contracts.WalkingMan.abi,
            contractAddress: nftAddress,
            functionName: "tokenURI",
            params: {
                tokenId: tokenId,
            },
        })

    const { runContractFunction: buyItem, error: buyError } = useWeb3Contract({
        abi: contracts.NFTMarketplace.abi,
        contractAddress: nftMarketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
        // This doesn't exist
        // overrides: {},
    })

    async function updateUI() {
        console.log(`TokenURI is: ${tokenURI}`)
        // We are cheating a bit here...
        if (tokenURI) {
            const requestURL = (tokenURI as string).replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            )
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = (imageURI as string).replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            )
            console.log(`imageURI=${imageURI}, imageURL=${imageURIURL}`)
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    useEffect(() => {
        updateUI()
    }, [tokenURI])

    useEffect(() => {
        isWeb3Enabled && getTokenURI()
    }, [isWeb3Enabled])

    // These only work on valid chains, sorry - doesn't work locally
    // const options: tokenIdMetadataParams = {
    //     chain: chainId!.toString() as chainType,
    //     address: nftAddress,
    //     token_id: tokenId.toString(),
    // }

    // const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    //     Web3Api.token.getTokenIdMetadata,
    //     options
    // )
    // const getTokenIdMetadata = async () => {
    //     try {
    //         const result = await Web3Api.token.getTokenIdMetadata(options)
    //         console.log(result)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const isOwnedByUser = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUser
        ? "you"
        : truncateStr(seller || "", 15)

    const handleCardClick = async function () {
        if (isOwnedByUser) {
            setShowModal(true)
        } else {
            console.log(nftMarketplaceAddress)
            await buyItem({
                onSuccess: () => handleBuyItemSuccess(),
                onError: (error) => {
                    console.log(error)
                },
            })
        }
    }

    const handleBuyItemSuccess = () => {
        dispatch({
            type: "success",
            message: "Item bought successfully",
            title: "Item Bought",
            position: "topR",
        })
    }

    const tooltipContent = isListed
        ? isOwnedByUser
            ? "Update listing"
            : "Buy me"
        : "Create listing"

    return (
        <div className="p-2">
            <SellNFTModal
                isVisible={showModal && !isListed}
                imageURI={imageURI}
                nftAbi={contracts.WalkingMan.abi}
                nftMarketplaceAbi={contracts.NFTMarketplace.abi}
                nftAddress={nftAddress}
                tokenId={tokenId}
                onClose={hideModal}
                nftMarketplaceAddress={nftMarketplaceAddress}
            />
            <UpdateListingModal
                isVisible={showModal && isListed}
                imageURI={imageURI}
                nftMarketplaceAbi={contracts.NFTMarketplace.abi}
                nftAddress={nftAddress}
                tokenId={tokenId}
                onClose={hideModal}
                nftMarketplaceAddress={nftMarketplaceAddress}
                currentPrice={price}
            />
            <Card
                title={tokenName}
                description={tokenDescription}
                onClick={handleCardClick}
            >
                <Tooltip content={tooltipContent} position="top">
                    <div className="p-2">
                        {imageURI ? (
                            <div className="flex flex-col items-end gap-2">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">
                                    Owned by {formattedSellerAddress}
                                </div>
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    alt="test-test-alt"
                                    height="200"
                                    width="200"
                                />
                                {price && (
                                    <div className="font-bold">
                                        {ethers.utils.formatEther(price)} ETH
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Illustration
                                    height="180px"
                                    logo="lazyNft"
                                    width="100%"
                                />
                                Loading...
                            </div>
                        )}
                    </div>
                </Tooltip>
            </Card>
        </div>
    )
}
export default NFTBox
