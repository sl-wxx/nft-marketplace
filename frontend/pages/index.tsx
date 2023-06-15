import type { NextPage } from "next"
// import { useState } from "react"
import NFTBox from "../components/NFTBox"
import GET_ACTIVE_ITEMS from "../graphql/subgraphQueries"
import { useQuery } from "@apollo/client"
import abis from "../../abis/abis"
import { useMoralis } from "react-moralis"

// const PAGE_SIZE = 9

interface nftInterface {
    price: number
    nftAddress: string
    tokenId: string
    address: string
    seller: string
}

const Home: NextPage = () => {
    // TODO: Implement paging in UI
    // const [page, setPage] = useState(1)
    const { chainId: chainIdHex } = useMoralis()
    const chainId = chainIdHex ? parseInt(chainIdHex).toString() : "11155111"

    const networkConfig: any = abis[chainId as keyof typeof abis]
    const marketplaceAddress = networkConfig[0].contracts.NFTMarketplace.address

    const {
        loading,
        error: subgraphQueryError,
        data: listedNfts,
    } = useQuery(GET_ACTIVE_ITEMS)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {loading || !listedNfts ? (
                    <div>Loading...</div>
                ) : (
                    listedNfts.activeItems.map(
                        (nft: nftInterface /*, index*/) => {
                            const { price, nftAddress, tokenId, seller } = nft

                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    nftMarketplaceAddress={marketplaceAddress!}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        }
                    )
                )}
            </div>
        </div>
    )
}
export default Home
