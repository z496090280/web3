// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IZuniswapV2Pair {
    function initialize(address, address) external;

    function getReserves() external returns (uint112, uint112);

    function mint(address) external returns (uint256);
}
