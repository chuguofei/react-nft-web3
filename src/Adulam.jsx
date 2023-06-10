import abi from "./abis/src/contracts/Adulam.sol/Adulam.json";
import address from "./abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "./store";
import { ethers } from "ethers";
import { Modal } from "@arco-design/web-react";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`;

// 获取以太坊合约实例
const getEtheriumContract = () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

// 检查钱包是否已连接
const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // 已经连接上钱包
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    // 切换账户
    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWalletConnected();
    });

    if (accounts.length) {
      // 设置当前账户
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

// 支付以太币来铸造 NFT
const payToMint = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    // 获取当前账户
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = getEtheriumContract();
    const amount = ethers.utils.parseEther("0.001");

    // 调用solidity中的方法
    await contract.payToMint({
      from: connectedAccount,
      value: amount._hex,
    });

    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

// 判断账户是否连接
const isWallectConnected = async () => {
  try {
    const accounts = await getAccountFun("eth_accounts");
    if (!accounts) return;

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWallectConnected();
    });

    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

// 连接钱包
const connectWallet = async () => {
  try {
    const accounts = getAccountFun("eth_requestAccounts");
    if (!accounts) return;
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

const getAccountFun = async (type) => {
  if (!ethereum) {
    Modal.error({
      title: "提示",
      content: "请先安装 Meta mask",
    });
    return null;
  }
  const accounts = await ethereum.request({ method: type });
  if (!accounts.length) {
    Modal.error({
      title: "提示",
      content: "请连接钱包",
    });
    return null;
  }
  console.error(accounts);
  return accounts;
};

// 加载 NFT 列表
const loadNfts = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    // 获取ether实例
    const contract = getEtheriumContract();
    // 调用solidity中的方法,获取所有列表
    const nfts = await contract.getAllNFTs();

    setGlobalState("nfts", structuredNfts(nfts));
  } catch (error) {
    reportError(error);
  }
};

const structuredNfts = (nfts) =>
  nfts
    .map((nft) => ({
      id: Number(nft.id),
      url: opensea_uri + nft.id,
      buyer: nft.buyer,
      imageURL: nft.imageURL,
      cost: parseInt(nft.cost._hex) / 10 ** 18,
      timestamp: new Date(nft.timestamp.toNumber()).getTime(),
    }))
    .reverse();

// 报告错误
const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { isWallectConnected, connectWallet, payToMint, loadNfts };
