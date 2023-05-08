import { useCallback, useContext, useEffect } from "react";
import { ethers } from "ethers";
import Loading from "@/components/Loading";
/*
 * @Author: lee
 * @Date: 2023-05-08 16:02:00
 * @LastEditTime: 2023-05-08 16:42:29
 */
import { WalletCtx } from "@/context/Wallet";

function Connect() {
  const {
    walletProvider,
    account,
    setAccount,
    setNetworkName,
    setBalance,
    showMessage,
    refresh,
  } = useContext(WalletCtx);

  const refreshBalance = useCallback(async () => {
    if (!walletProvider || !account) return;
    const balance = await walletProvider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  }, [setBalance, walletProvider, account]);

  useEffect(() => {
    refreshBalance();
  }, [refresh, refreshBalance]);

  const connectToMetamask = async () => {
    try {
      await window.ethereum.enable();
      const accounts = await walletProvider.send("eth_requestAccounts", []);
      const network = await walletProvider.getNetwork();
      const balance = await walletProvider.getBalance(accounts[0]);
      setAccount(accounts[0]);
      setNetworkName(network.name);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
      showMessage("failed to connect to metamask");
    }
  };

  const disconnect = async () => {
    setAccount("");
  };

  if (!account) {
    return (
      <div className="flex justify-end p-4">
        {walletProvider ? (
          <button className="btn" onClick={connectToMetamask}>
            connect to metamask
          </button>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-end items-center gap-2">
      <h1 className="text-end">Hello, {account}</h1>
      <button className="btn" onClick={disconnect}>
        disconnect
      </button>
    </div>
  );
}

export default Connect;
