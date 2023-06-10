// 引入必要的库和模块
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  // 默认使用的网络是本地节点
  defaultNetwork: "localhost",
  // 配置网络选项
  networks: {
    hardhat: {}, // Hardhat网络配置为空对象，使用默认配置
    localhost: {
      url: "http://127.0.0.1:8545", // 本地节点的URL
    },
    goerli: {
      url: process.env.ENDPOINT_URL, // Goerli 网络的URL，从环境变量中获取
      accounts: [process.env.DEPLOYER_KEY], // 使用环境变量中的部署者密钥作为账户
    },
  },
  // Solidity合约编译器配置
  solidity: {
    version: "0.8.18", // 使用的Solidity版本
    settings: {
      optimizer: {
        enabled: true, // 启用优化器
        runs: 200, // 运行优化器的次数
      },
    },
  },
  // 文件路径配置
  paths: {
    sources: "./src/contracts", // Solidity合约源文件路径
    artifacts: "./src/abis", // 编译后的合约构件文件路径
  },
  // Mocha测试框架配置
  mocha: {
    timeout: 40000, // 设置测试超时时间为40秒
  },
};
