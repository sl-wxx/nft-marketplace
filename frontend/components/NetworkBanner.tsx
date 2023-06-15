import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import abis from "../../abis/abis"
import { BannerStrip } from "@web3uikit/core"

const isValidNetwork = (chainId: string) => {
    if (abis.hasOwnProperty(chainId)) {
        return true
    }
    return false
}

const NetworkBanner = () => {
    const { Moralis, isAuthenticated, web3, isWeb3Enabled, chainId } =
        useMoralis()

    const [currentChainId, setCurrentChainId] = useState<number | undefined>(
        undefined
    )

    const getChainId = async () => {
        if (isAuthenticated && isWeb3Enabled && web3) {
            const network = await web3.getNetwork()
            setCurrentChainId(network.chainId ?? 0)
        }
        return 0
    }

    useEffect(() => {
        getChainId()
    }, [isAuthenticated, isWeb3Enabled])

    Moralis.onChainChanged(() => {
        window.location.reload()
    })

    const [showNetworkSwitcherDialog, setShowNetworkSwitcherDialog] =
        useState(false)

    useEffect(() => {
        if (
            currentChainId === undefined ||
            isValidNetwork(currentChainId ? currentChainId?.toString() : "")
        ) {
            setShowNetworkSwitcherDialog(false)
        } else {
            setShowNetworkSwitcherDialog(true)
        }
    }, [currentChainId])

    return (
        <>
            {showNetworkSwitcherDialog && (
                <BannerStrip
                    id="test-test-id"
                    type="error"
                    text="Connected to unsupported network"
                />
            )}
        </>
    )
}

export default NetworkBanner
