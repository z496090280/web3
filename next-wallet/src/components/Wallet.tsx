/*
 * @Author: lee
 * @Date: 2023-05-08 15:29:16
 * @LastEditTime: 2023-05-08 17:16:18
 */
import { Dialog } from "@headlessui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Connect from "@/components/Connect";
import Details from "@/components/Details";
import Transfer from "@/components/Transfer";
import { WalletCtx } from "@/context/Wallet";

export default function Wallet() {
  const [walletProvider, setWalletProvider] = useState<any>(null);
  const [msgIsOpen, setMsgIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [account, setAccount] = useState<string>("");
  const [networkName, setNetworkName] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setWalletProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  const showMessage = (message: string) => {
    setMsg(message);
    setMsgIsOpen(true);
    setTimeout(() => {
      setMsg("");
      setMsgIsOpen(false);
    }, 2000);
  };

  return (
    <WalletCtx.Provider
      value={{
        walletProvider,
        setWalletProvider,
        msgIsOpen,
        setMsgIsOpen,
        msg,
        setMsg,
        account,
        setAccount,
        networkName,
        setNetworkName,
        balance,
        setBalance,
        showMessage,
        refresh,
        setRefresh,
      }}
    >
      <div className="flex flex-col gap-4 p-4">
        <Dialog open={msgIsOpen} as={"div"} onClose={() => setMsgIsOpen(false)}>
          <div className="fixed flex justify-center items-center w-full top-2">
            <Dialog.Panel className="inline-flex flex-col bg-green-400 text-slate-600 p-4 shadow-xl rounded-3xl">
              <Dialog.Title>{msg}</Dialog.Title>
            </Dialog.Panel>
          </div>
        </Dialog>
        <Connect />
        <Details />
        <Transfer />
      </div>
    </WalletCtx.Provider>
  );
}
