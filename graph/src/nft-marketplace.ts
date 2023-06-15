import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
    ItemBought as ItemBoughtEvent,
    ItemCanceled as ItemCanceledEvent,
    ItemListed as ItemListedEvent,
} from "../generated/NFTMarketplace/NFTMarketplace"
import { ActiveItem, ItemBought, ItemCanceled, ItemListed } from "../generated/schema"
import { store, log } from "@graphprotocol/graph-ts"

export function handleItemBought(event: ItemBoughtEvent): void {
    let entity = new ItemBought(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.buyer = event.params.buyer
    entity.nftAddress = event.params.nftAddress
    entity.tokenId = event.params.tokenId
    entity.price = event.params.price
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()

    const activeItemId = id(event.params.nftAddress, event.params.tokenId)
    log.info("store.remove ActiveItem: {}", [activeItemId])
    store.remove("ActiveItem", activeItemId)
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
    let entity = new ItemCanceled(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.seller = event.params.seller
    entity.nftAddress = event.params.nftAddress
    entity.tokenId = event.params.tokenId
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()

    const activeItemId = id(event.params.nftAddress, event.params.tokenId)
    log.info("store.remove ActiveItem: {}", [activeItemId])
    store.remove("ActiveItem", activeItemId)
}

export function handleItemListed(event: ItemListedEvent): void {
    let entity = new ItemListed(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.seller = event.params.seller
    entity.nftAddress = event.params.nftAddress
    entity.tokenId = event.params.tokenId
    entity.price = event.params.price
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()

    const activeItemId = id(event.params.nftAddress, event.params.tokenId)
    let activeItem = new ActiveItem(activeItemId)
    activeItem.seller = event.params.seller
    activeItem.nftAddress = event.params.nftAddress
    activeItem.tokenId = event.params.tokenId
    activeItem.price = event.params.price
    activeItem.blockNumber = event.block.number
    activeItem.blockTimestamp = event.block.timestamp
    activeItem.transactionHash = event.transaction.hash
    activeItem.save()
    log.info("ActiveItem.save(): {}", [activeItemId])
}

function id(nftAddress: Address, tokenId: BigInt): string {
    return nftAddress.toHexString() + "-" + tokenId.toHexString()
}
