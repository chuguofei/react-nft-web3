// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Adulam is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string baseURI; // NFT元数据的基本URI
    string public baseExtension = ".json"; // NFT元数据文件的扩展名
    string public baseImage = ".webp"; // NFT图像文件的扩展名
    uint256 public cost = 0.001 ether; // 铸造每个NFT代币所需的费用
    uint256 public maxSupply = 99; // NFT代币的最大供应量
    bool public paused = false; // 铸造功能是否暂停

    event Sale(
        uint256 id,
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct SaleStruct {
        uint256 id; // NFT代币的ID
        address buyer; // 购买者的地址
        uint256 cost; // 购买NFT代币的费用
        string imageURL; // NFT代币的图像URL
        uint256 timestamp; // 购买的时间戳
    }

    SaleStruct[] minted; // 已铸造的NFT代币数组

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseUrl(_initBaseURI); // 设置初始的基本URI
    }

    function payToMint() public payable {
        uint256 supply = totalSupply(); // 已铸造的NFT代币数量
        require(!paused, "NFTs under maintenance!"); // 检查铸造功能是否暂停
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!"); // 检查是否已经达到最大供应量
        require(msg.value > 0 ether, "Ether too low for minting!"); // 检查支付的以太币是否足够

        // 判断当前调用合约的用户是否为合约所有者
        if (msg.sender != owner()) {
            require(msg.value >= cost); // 检查支付的费用是否足够
        }

        _safeMint(msg.sender, supply + 1); // 铸造新的NFT代币

        minted.push(
            SaleStruct(
                supply + 1,
                msg.sender,
                msg.value,
                toImage(supply + 1),
                block.timestamp
            )
        ); // 将新铸造的NFT代币信息添加到minted数组中

        // 向网页发送事件
        emit Sale(
            supply,
            msg.sender,
            msg.value,
            tokenURI(supply + 1),
            block.timestamp
        ); // 触发Sale事件
    }

    function toImage(uint256 tokenId) internal view returns (string memory) {
        string memory currentBaseURI = _baseURI(); // 获取当前的基本URI
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseImage
                    )
                )
                : ""; // 返回代币的图像URL
    }

    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted; // 返回所有已铸造的NFT代币的信息数组
    }

    function getAnNFTs(
        uint256 tokenId
    ) public view returns (SaleStruct memory) {
        return minted[tokenId - 1]; // 根据给定的tokenId返回相应的NFT代币信息
    }

    function setBaseUrl(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI; // 设置基本URI
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI; // 返回基本URI
    }
}
