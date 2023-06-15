export default {
    "31337": [
        {
            name: "hardhat",
            chainId: "31337",
            contracts: {},
        },
    ],
    "11155111": [
        {
            name: "sepolia",
            chainId: "11155111",
            contracts: {
                NFTMarketplace: {
                    address: "0x391c9Fd93684B72FdDa5d9C1C46eb74b1B4996d5",
                    abi: [
                        {
                            inputs: [],
                            stateMutability: "nonpayable",
                            type: "constructor",
                        },
                        {
                            inputs: [],
                            name: "AlreadyListed",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "MoneyNotEnough",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "NoBalance",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "NotApproved",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "NotListed",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "NotOwner",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "PriceMustAboveZero",
                            type: "error",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "buyer",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "price",
                                    type: "uint256",
                                },
                            ],
                            name: "ItemBought",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "seller",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "ItemCanceled",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "seller",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "price",
                                    type: "uint256",
                                },
                            ],
                            name: "ItemListed",
                            type: "event",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "",
                                    type: "address",
                                },
                            ],
                            name: "balanceOf",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "buyItem",
                            outputs: [],
                            stateMutability: "payable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "cancelListing",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                                {
                                    internalType: "uint256",
                                    name: "price",
                                    type: "uint256",
                                },
                            ],
                            name: "listItem",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "nftAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                                {
                                    internalType: "uint256",
                                    name: "price",
                                    type: "uint256",
                                },
                            ],
                            name: "updateListing",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "withdraw",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                    ],
                },
                WalkingMan: {
                    address: "0xCE760427e77a9B12727841bd3E614F84282C180d",
                    abi: [
                        {
                            inputs: [],
                            stateMutability: "nonpayable",
                            type: "constructor",
                        },
                        {
                            inputs: [],
                            name: "AlreadySoldOut",
                            type: "error",
                        },
                        {
                            inputs: [],
                            name: "MoneyNotEnough",
                            type: "error",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "approved",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "Approval",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "bool",
                                    name: "approved",
                                    type: "bool",
                                },
                            ],
                            name: "ApprovalForAll",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "minter",
                                    type: "address",
                                },
                            ],
                            name: "Minted",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "previousOwner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "newOwner",
                                    type: "address",
                                },
                            ],
                            name: "OwnershipTransferred",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                            ],
                            name: "Paused",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "to",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "Transfer",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                            ],
                            name: "Unpaused",
                            type: "event",
                        },
                        {
                            inputs: [],
                            name: "MINT_FEE",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "TOTAL_COUNT",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "to",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "approve",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                            ],
                            name: "balanceOf",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "getApproved",
                            outputs: [
                                {
                                    internalType: "address",
                                    name: "",
                                    type: "address",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                            ],
                            name: "isApprovedForAll",
                            outputs: [
                                {
                                    internalType: "bool",
                                    name: "",
                                    type: "bool",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "name",
                            outputs: [
                                {
                                    internalType: "string",
                                    name: "",
                                    type: "string",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "owner",
                            outputs: [
                                {
                                    internalType: "address",
                                    name: "",
                                    type: "address",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "ownerOf",
                            outputs: [
                                {
                                    internalType: "address",
                                    name: "",
                                    type: "address",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "pause",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "paused",
                            outputs: [
                                {
                                    internalType: "bool",
                                    name: "",
                                    type: "bool",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "renounceOwnership",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "safeMint",
                            outputs: [],
                            stateMutability: "payable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "to",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "safeTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "to",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                                {
                                    internalType: "bytes",
                                    name: "data",
                                    type: "bytes",
                                },
                            ],
                            name: "safeTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                                {
                                    internalType: "bool",
                                    name: "approved",
                                    type: "bool",
                                },
                            ],
                            name: "setApprovalForAll",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "bytes4",
                                    name: "interfaceId",
                                    type: "bytes4",
                                },
                            ],
                            name: "supportsInterface",
                            outputs: [
                                {
                                    internalType: "bool",
                                    name: "",
                                    type: "bool",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "symbol",
                            outputs: [
                                {
                                    internalType: "string",
                                    name: "",
                                    type: "string",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "uint256",
                                    name: "index",
                                    type: "uint256",
                                },
                            ],
                            name: "tokenByIndex",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "index",
                                    type: "uint256",
                                },
                            ],
                            name: "tokenOfOwnerByIndex",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "tokenURI",
                            outputs: [
                                {
                                    internalType: "string",
                                    name: "",
                                    type: "string",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "totalSupply",
                            outputs: [
                                {
                                    internalType: "uint256",
                                    name: "",
                                    type: "uint256",
                                },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "to",
                                    type: "address",
                                },
                                {
                                    internalType: "uint256",
                                    name: "tokenId",
                                    type: "uint256",
                                },
                            ],
                            name: "transferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    internalType: "address",
                                    name: "newOwner",
                                    type: "address",
                                },
                            ],
                            name: "transferOwnership",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "unpause",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "withdraw",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                    ],
                },
            },
        },
    ],
}
