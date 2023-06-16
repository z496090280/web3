/*
 * @Author: lee
 * @Date: 2023-05-22 17:43:06
 * @LastEditTime: 2023-06-02 11:07:32
 */
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "Fn1",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "Fn2",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_str",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_s",
        type: "uint8",
      },
    ],
    name: "fn1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_str",
        type: "string",
      },
    ],
    name: "fn2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "myMap",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default abi;
