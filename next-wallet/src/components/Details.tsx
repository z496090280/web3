/*
 * @Author: lee
 * @Date: 2023-05-08 16:29:21
 * @LastEditTime: 2023-05-08 16:31:01
 */
import { WalletCtx } from "@/context/Wallet";
import { useContext } from "react";

function Details() {
  const { account, networkName, balance } = useContext(WalletCtx);
  if (!account) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 w-full bg-slate-800 text-white p-4 rounded-md">
      <div className="flex justify-between">
        <div className="text-2xl font-thin">balance</div>
        <div>network: {networkName}</div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl">{balance}</div>
        <div>ETH</div>
      </div>
    </div>
  );
}

export default Details;
