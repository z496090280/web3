import { createContext } from "react";

type IWalletCtx = {
  walletProvider: any;
  setWalletProvider: (walletProvider: any) => void;
  msgIsOpen: boolean;
  setMsgIsOpen: (msgIsOpen: boolean) => void;
  msg: string;
  setMsg: (msg: string) => void;
  account: string;
  setAccount: (account: string) => void;
  networkName: string;
  setNetworkName: (networkName: string) => void;
  balance: string;
  setBalance: (balance: string) => void;
  showMessage: (message: string) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
};

export const WalletCtx = createContext<IWalletCtx>({} as IWalletCtx);
