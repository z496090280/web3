/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-05-30 20:32:54
 */
import { Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useSignMessage } from "wagmi";
import receivedABI from "@/abi/received";
import { produce } from "immer";
const { Option } = Select;

const mocktableData = [
  { label: "alax", value: "*", id: 1 },
  { label: "alax1", value: "**", id: 2 },
  { label: "alax2", value: "***", id: 3 },
];
const nameList = ["alax", "alax1", "alax2"];

function DappVote() {
  const [cuscontract, setcontract] = useState<ethers.Contract>();
  const [current, setcurrent] = useState("");
  const [selected, setSelected] = useState(mocktableData);
  const [useAddress, setUseAddress] = useState("");
  useEffect(() => {
    cuscontract &&
      cuscontract.on("voteStatus", function (err, result) {
        console.log(err, result);
      });

    return () => {
      cuscontract && cuscontract.removeAllListeners("voteStatus");
    };
  }, [cuscontract]);

  async function init() {
    try {
      const res = await Contract().getMapValueToArray(nameList);
      console.log(res);
      utilsOne(res);
    } catch (err) {
      console.log(err);
    }
  }
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setcurrent(e.target.value);
  };
  function utilsOne(arr: string[]) {
    const result = selected.map((item, idx) => {
      return {
        ...item,
        value: arr[idx],
      };
    });
    setSelected(result);
  }
  function check() {
    // 安装钱包即有
    const { ethereum } = window;
    if (!ethereum) {
      notification.error({
        message: "发生错误",
        description: "请您先安装钱包.",
      });
      return false;
    }
    return true;
  }

  const connectWallet = async () => {
    try {
      if (check()) {
        const [result] = await Provider().send("eth_requestAccounts", []);
        setUseAddress(result);
      }
    } catch (err: any) {
      console.log(err);
      notification.error({
        message: "发生错误",
        description: err.message,
      });
    }
  };
  async function touppiao() {
    try {
      const res = await Contract().voteForCandidate(current);
      await res.wait();
      await init();
    } catch (err) {
      console.log(err);
    }
  }
  function Provider() {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  function Contract() {
    const provider = Provider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x5A614160306aCa02FC441145857C7CEF124AA3D9",
      receivedABI,
      signer
    );
    setcontract(contract);
    return contract;
  }
  return (
    <div>
      <h1>投票后可查看结果</h1>
      <table className="border-separate border border-slate-400 hover:border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-300 ">人名</th>
            <th className="border border-slate-300 ">票数</th>
          </tr>
        </thead>
        <tbody>
          {selected.map((item) => {
            return (
              <tr key={item.id}>
                <td className="border border-slate-300 ">{item.label}</td>
                <td className="border border-slate-300 ">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <select onChange={handleChange}>
          {selected.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        {useAddress ? (
          <>
            <p>用户：{useAddress}</p>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            链接钱包
          </button>
        )}
        <button
          onClick={touppiao}
          style={{ marginTop: "16px" }}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          投票
        </button>
        <button onClick={init}>查看候选人票数</button>
        {/* <button onClick={() => console.log(selected)}>test</button> */}
      </div>
    </div>
  );
}

export default DappVote;
