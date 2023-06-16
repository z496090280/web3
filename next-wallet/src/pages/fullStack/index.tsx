/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-05-29 14:55:33
 */


import { ethers } from "ethers";
import abi from "@/abi/Card";
import { useState } from "react";

function FullStack() {
  const [isC, setIsc] = useState(false);
  const [address, setAddress] = useState(false);
  async function connect() {
    const use = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (use[0]) {
      setIsc(true);
      setAddress(use[0]);
    }
  }
  async function handleMint() {
    try {
      const api = JSON.stringify(abi);
      // 创建合约:
      let contract = new ethers.Contract(
        // 合约地址:
        '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        // 合约的ABI接口
        api,
        // 钱包签名对象:
        new ethers.providers.Web3Provider(window.ethereum, "any").getSigner()
    );
    // 调用mint()方法:
    let tx = await contract.mint();
    // 等待1个确认:
   const test =   await tx.wait(1);
    // TODO: 解析tx的日志并拿到TokenID
    console.log(test)
    console.log(tx)
    } catch(err) {
      console.log(err)
    }

  }
  if (isC) {
    return (
      <div>
        <p>Connected to: {address}</p>
        <button onClick={handleMint}>合约方法调用</button>
      </div>
    );
  }
  return <button onClick={() => connect()}>Connect Wallet</button>;
}

export default FullStack;
