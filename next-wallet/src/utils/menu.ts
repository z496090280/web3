/*
 * @Author: lee
 * @Date: 2023-05-13 17:24:05
 * @LastEditTime: 2023-06-03 21:21:42
 */
export interface IMenu {
  title: string;
  path: string;
  desc: string;
}
const MENU_TREE: Array<IMenu> = [
  {
    title: "钱包",
    path: "/wallet",
    desc: "使用 ethers.js 连接 Metamask，实现了连接、断开、查询余额、刷新余额、转账等加密钱包的极简功能。麻雀虽小，五脏俱全。",
  },
  {
    title: "空投DApp",
    path: "/airDrop",
    desc: "用于领取 ERC20 代币的水龙头，实现了简单的代币领取功能。这个版本的实现需要用户连接钱包，并由用户支付 gas 才可以领取。",
  },
  {
    title: "DApp全栈开发(施工中)",
    path: "/fullStack",
    desc: "区块链、钱包、智能合约、UI；The Graph提供的Hosted Service",
  },
  {
    title: "DApp投票",
    path: "/received",
    desc: "一款全栈去中心化dapp投票应用",
  },
  {
    title: "服务端渲染",
    path: "/posts",
    desc: "数据拉取及动态路由",
  },
  {
    title: "web3钱包交互组件",
    path: "/walletUI",
    desc: "用next.js、wagmi、rainbowkit搭建一个美丽的web3钱包交互组件",
  },
  {
    title: "Merkle Trees(默克尔树)",
    path: "/merkle",
    desc: "构建Merkle Trees，用js验证它",
  },
  {
    title: "example 展示",
    path: "/example",
    desc: "demo 测试入口",
  },
];

export default MENU_TREE;
