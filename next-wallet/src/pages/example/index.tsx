/*
 * @Author: lee
 * @Date: 2023-05-29 15:25:10
 * @LastEditTime: 2023-05-30 22:11:49
 */

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import TestABI from "@/abi/Test";

export default function Example() {
  const [walletProvider, setWalletProvider] = useState<any>(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setWalletProvider(provider);
    const Contract = new ethers.Contract(
      "0xF19ECd3CA474D8e0eB271E2baA24e43d12Fc4507",
      TestABI,
      provider.getSigner()
    );
    setContract(Contract);
    Contract.on("Fn1", function (err, result) {
      console.log("Fn1: " + err, result);
    });
    Contract.on("Fn2", function (err, result) {
      console.log("Fn2: " + err, result);
    });

    return () => {
      // 删除监听操作
      Contract.removeAllListeners();
    };
  }, [account]);

  async function connectWallet() {
    const [result] = await walletProvider.send("eth_requestAccounts", []);
    setAccount(result);
  }

  async function setMap() {
    const tx = await contract.fn1("alax2", 22);
    const res = await tx.wait();
    console.log(res);
  }

  async function setName() {
    const tx = await contract.fn2("chenren2");
    const res = await tx.wait();
    console.log(res);
  }
  return (
    <div className="w-full px-4 pt-16">
      {account ? (
        <>当前：{account}</>
      ) : (
        <button onClick={connectWallet}>链接钱包</button>
      )}
      <br />
      <button onClick={setMap}>设置mapping</button>
      <p>mapping event:</p>
      <br />
      <button onClick={setName}>设置name</button>
      <p>name event:</p>
      <br />
      <button>查看name</button>
      <p>合约当前name:</p>
      <br />
    </div>
  );
}
