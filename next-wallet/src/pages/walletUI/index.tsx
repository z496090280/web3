/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-06-01 21:39:55
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
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  function handleAirDorp() {}
  function setAddress() {
    write?.();
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xBb44A3fdfa37f45CbA49c29288FDa6Af2B7C707c",
    abi: lee,
    functionName: "setAddress",
    args: ["0x6C860E1F8fdBb1308D8Aad0153E9a7e0F8Df3eDE"],
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  if (isConnected)
    return (
      <div>
        {chain && <div>Connected to {chain.name}</div>}
        {chains && (
          <div>Available chains: {chains.map((chain) => chain.name)}</div>
        )}
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
        <br />
        设置空投合约地址：<button onClick={setAddress}>触发函数</button>
        <br />
        空投合约: <button onClick={handleAirDorp}>每个地址20token</button>
        <button disabled={!write || isLoading}>
          {isLoading ? "Minting..." : "Mint"}
        </button>
        {isSuccess && (
          <div>
            Successfully minted your NFT!
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    );
  return <button onClick={openConnectModal}>Connect Wallet</button>;
}

export default AirDrop;
