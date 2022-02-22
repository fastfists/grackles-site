// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GrabbyGrackles is ERC721, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private _tokenURIs;

  // mapping saves the NFT prices set by tokenId in wei
  mapping (uint256 => uint256) private prices;

  
  constructor() ERC721("GrabbyGrackles", "GGNFT") {}

  function _setTokenURI(uint256 tokenId, string memory _tokenURI)
    internal
    virtual
  {
    _tokenURIs[tokenId] = _tokenURI;
  }

  function tokenURI(uint256 tokenId) 
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    string memory _tokenURI = _tokenURIs[tokenId];
    return _tokenURI;
  }

  function mint(address recipient, string memory uri, uint256 price)
    public onlyOwner
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, uri);
    prices[newItemId] = price;
    
    return newItemId;
  }

  function setPrice(uint256 tokenId, uint256 price) public {
    address owner = ownerOf(tokenId);
    require(owner == msg.sender, "You are not the owner of this NFT, you can't set the price");

    prices[tokenId] = price;
  }

  function getPrice(uint256 tokenId) public view returns(uint256) {
    return prices[tokenId];
  }

  function buyNFT(address recipient, uint256 tokenId) public payable {
    require(ownerOf(tokenId) != recipient, "You already own this NFT");
    require(balanceOf(recipient) >= prices[tokenId], "Insufficient balance");

    address seller = ownerOf(tokenId);
    _transfer(seller, recipient, tokenId);
    payable(seller).transfer(msg.value);
  }

}
