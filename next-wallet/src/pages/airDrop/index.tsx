/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-06-02 21:33:00
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
  Card,
  Divider,
  Button,
  Input,
  Select,
  Space,
  Alert,
  InputNumber,
} from "antd";
import { InjectedConnector } from "wagmi/connectors/injected";
import lee from "@/abi/lee";
import { useState } from "react";

const { TextArea } = Input;
function AirDrop() {
  const [value, setValue] = useState<string | number | null>("");
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
      <div className="max-w flex-col  py-8 bg-slate-50 rounded-lg p">
        {chain && (
          <Card
            className="max-w grid relative "
            title={chain.name}
            bordered={false}
          >
            <div>Available chains: {chains.map((chain) => chain.name)}</div>
            {chain && <div>Connected to: {chain.name}</div>}
            Connected to: {address}
            <div className="absolute right-2 bottom-2">
              <button
                onClick={() => disconnect()}
                className="border-solid border-2 border-indigo-600 rounded-full py-1 px-3 text-white bg-indigo-600 place-items-end"
              >
                Disconnect
              </button>
            </div>
          </Card>
        )}
        <div className="ml-4">
          <Divider>请先设置空投合约地址</Divider>
          设置空投合约地址：
          <Space.Compact style={{ width: "50%" }}>
            <Input placeholder="输入合约地址" />
            <Button onClick={setAddress} type="primary" className="bg-blue-500">
              设置
            </Button>
          </Space.Compact>
          <Divider>开始空投</Divider>
          <Alert
            message="支持一次性转账多个地址"
            description="即多个地址对应一个数量，地址间用换行分隔."
            type="success"
            showIcon
            className="mb-10"
          />
          <TextArea
            style={{ width: "50%" }}
            rows={4}
            placeholder="地址之间使用换行分隔"
            maxLength={6}
            className="mb-2"
          />
          <div>
            {value ? (
              <p className="my-4">
                每个地址 <span className="text-red-500">{value}</span> token
              </p>
            ) : null}
          </div>
          <Space>
            <InputNumber min={1} max={10} value={value} onChange={setValue} />
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={handleAirDorp}
              disabled={!value}
            >
              确认空投
            </Button>
          </Space>
        </div>
        {isSuccess && <div>Successfully minted your NFT!</div>}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    );
  return (
    <>
      <div className="aspect-video p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="text-center mx-auto">
          <h1 className="text-3xl font-bold underline ">这里是机场!</h1>
          <button
            onClick={() => connect()}
            className="py-2 px-4 bg-blue-500 mt-10 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            链接钱包
          </button>
        </div>
      </div>
    </>
  );
}

export default AirDrop;
