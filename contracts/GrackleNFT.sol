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
    require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT, you can't set the price");

    prices[tokenId] = price;
  }

  function getPrice(uint256 tokenId) public view returns(uint256) {
    return prices[tokenId];
  }

  function getPrices() public view returns(uint256[] memory) {
    uint n = _tokenIds.current();
    uint256[] memory cost = new uint256[](n);
    for (uint i = 0; i < n; i++) {
      cost[i] = prices[i + 1];
    }
    return cost;
  }

  function getOwners() public view returns(address[] memory) {
    uint n = _tokenIds.current();
    address[] memory owners = new address[](n);
    for (uint i = 0; i < n; i++) {
      owners[i] = ownerOf(i + 1);
    }
    return owners;
  }

  function buyNFT(address recipient, uint256 tokenId) public payable {
    require(recipient != address(0), "Recipient can't be null");
    require(ownerOf(tokenId) != recipient, "You already own this NFT");
    require(msg.value >= prices[tokenId], "Insufficient balance");

    address seller = ownerOf(tokenId);
    _transfer(seller, recipient, tokenId);
    payable(seller).transfer(msg.value);
  }

}
