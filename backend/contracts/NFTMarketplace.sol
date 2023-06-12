// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    error NotOwner();
    error PriceMustAboveZero();
    error NotApproved();
    error AlreadyListed();
    error NotListed();
    error MoneyNotEnough();
    error NoBalance();

    mapping(address => mapping(uint256 => Listing)) private _listings;

    mapping(address => uint256) public balanceOf;

    constructor() {}

    // list item
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external {
        if (price <= 0) {
            revert PriceMustAboveZero();
        }

        if (_listings[nftAddress][tokenId].price > 0) {
            revert AlreadyListed();
        }

        IERC721 erc721 = IERC721(nftAddress);
        if (msg.sender != erc721.ownerOf(tokenId)) {
            revert NotOwner();
        }

        if (erc721.getApproved(tokenId) != address(this)) {
            revert NotApproved();
        }

        _listings[nftAddress][tokenId] = Listing(msg.sender, price);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    // buy item
    function buyItem(address nftAddress, uint256 tokenId) external payable {
        Listing memory listing = _listings[nftAddress][tokenId];
        uint256 price = listing.price;
        if (price <= 0) {
            revert NotListed();
        }

        if (msg.value < price) {
            revert MoneyNotEnough();
        }

        delete _listings[nftAddress][tokenId];
        balanceOf[listing.seller] += price;

        IERC721 erc721 = IERC721(nftAddress);
        erc721.safeTransferFrom(listing.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(address nftAddress, uint256 tokenId) external {
        Listing memory listing = _listings[nftAddress][tokenId];
        if (msg.sender != listing.seller) {
            revert NotOwner();
        }

        delete _listings[nftAddress][tokenId];
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external {
        if (price <= 0) {
            revert PriceMustAboveZero();
        }

        IERC721 erc721 = IERC721(nftAddress);
        if (msg.sender != erc721.ownerOf(tokenId)) {
            revert NotOwner();
        }

        if (erc721.getApproved(tokenId) != address(this)) {
            revert NotApproved();
        }

        _listings[nftAddress][tokenId].price = price;
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function withdraw() external {
        uint256 balance = balanceOf[msg.sender];
        if (balance <= 0) {
            revert NoBalance();
        }

        balanceOf[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success);
    }
}
