/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-06-02 21:31:35
 */
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { InjectedConnector } from "wagmi/connectors/injected";
import lee from "@/abi/lee";
function AirDrop() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="border-solid border-2 border-indigo-600 rounded-full py-1 px-3 text-white bg-indigo-600 place-items-end"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={openConnectModal}
          className="border-solid border-2 border-indigo-600 rounded-full py-1 px-3 text-white bg-indigo-600 place-items-end"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}

export default AirDrop;
