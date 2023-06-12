// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact gm0000fa@gmail.com
contract WalkingMan is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;

    uint256 public constant MINT_FEE = 0.1 ether;

    // total count (includes those that haven't mint)
    uint256 public constant TOTAL_COUNT = 3;

    string private constant _BASE_URI =
        "ipfs://bafybeihlhjurflhylqj7p6wqoujz4rgnvlsrj5jnhv3ultkg5zd7pwcmry/";

    Counters.Counter private s_tokenIdCounter;

    event Minted(address indexed minter);

    error MoneyNotEnough();
    error AlreadySoldOut();

    constructor() ERC721("WalkingMan", "YRZX") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint() external payable {
        if (totalSupply() >= TOTAL_COUNT) {
            revert AlreadySoldOut();
        }

        if (msg.value < MINT_FEE) {
            revert MoneyNotEnough();
        }

        uint256 tokenId = s_tokenIdCounter.current();
        s_tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() external onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success);
    }

    function _baseURI() internal pure override returns (string memory) {
        return _BASE_URI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
