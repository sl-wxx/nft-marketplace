import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <Link href="/">
                <h1 className="py-4 px-4 font-bold text-3xl">
                    NFT Marketplace
                </h1>
            </Link>
            <div className="flex flex-row items-center">
                <Link href="/" className="mr-4 p-6">
                    {/* Home is going to be the recent listings page */}
                    Home
                </Link>
                <Link href="/sell-nft" className="mr-4 p-6">
                    {/* This is going to include cancel listings, update listings, and withdraw proceeds */}
                    Sell NFTs
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
