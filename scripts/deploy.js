// import { ethers } from "hardhat";
// import fs from "fs";
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const base_uri =
    "https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/";
  // 使用ethers模块的getContractFactory方法获取名为"Adulam"的智能合约工厂。
  // 调用合约的类名
  const Contract = await ethers.getContractFactory("Adulam");

  // 通过调用智能合约工厂的deploy方法，部署一个名为"Adulam NFT"的合约，并传入"ADM"作为符号，以及之前定义的基础URI。
  const contract = await Contract.deploy("Adulam NFT", "ADM", base_uri);

  // 等待合约部署完成
  await contract.deployed();

  // 创建一个包含合约地址的JSON对象。
  const address = JSON.stringify({ address: contract.address }, null, 4);

  // 将合约地址写入文件./src/abis/contractAddress.json。文件内容为合约地址的JSON表示。
  fs.writeFile("./src/abis/contractAddress.json", address, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deployed contract address", contract.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
