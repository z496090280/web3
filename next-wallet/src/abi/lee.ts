/*
 * @Author: lee
 * @Date: 2023-06-01 17:04:20
 * @LastEditTime: 2023-06-02 17:29:48
 */
const abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_to",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "oneToMany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amount",
        type: "uint256[]",
      },
    ],
    name: "oneToOne",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "setAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export default abi;
