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
    desc: "用于领取 Noah 代币的水龙头，实现了简单的代币领取功能。这个版本的实现需要用户连接钱包，并由用户支付 gas 才可以领取。适合全栈开发者学习。",
  },
];

export default MENU_TREE;
