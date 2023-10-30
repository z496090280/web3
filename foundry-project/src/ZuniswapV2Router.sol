// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interfaces/IZuniswapV2Factory.sol";
import "./interfaces/IZuniswapV2Pair.sol";
import "./ZuniswapV2Library.sol";

contract ZuniswapV2Router {
  error InsufficientAAmount();
  error InsufficientBAmount();
  error SafeTransferFailed();

  IZuniswapV2Factory factory;

  constructor(address factroyAddress) {
    factory = IZuniswapV2Factory(factroyAddress);
  }

  function addLiquidity(
    address tokenA,
    address tokenB,
    uint256 amountADesired,
    uint256 amountBDesired,
    uint256 amountAMin,
    uint256 amountBMin,
    address to, 
    ) public returns(uint256 amountA, uint256 amountB, uint256 liquidity) {
    if(factory.pairs(tokenA, tokenB) == address(0)) {
      factory.createPair(tokenA, tokenB);
    }
    (amountA, amountB) = _calcukateLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin
    );
    address pairAddress = ZuniswapV2Library.pairFor(
      address(factory),
      tokenA,
      tokenB
    );
    _safeTransferFrom(tokenA, msg.sender, pairAddress, amountA);
    _safeTransferFrom(tokenB, msg.sender, pairAddress, amountB);
    liquidity = IZuniswapV2Pair(pairAddress).mint(to);
  }

  function _calcukateLiquidity(
    address tokenA,
    address tokenB,
    uint256 amountADesired,
    uint256 amountBDesired,
    uint256 amountAMin,
    uint256 amountBMin
  ) internal returns(uint256 amountA, uint256 amountB) {
    (uint256 reserveA, uint256 reserveB) = ZuniswapV2Library.getReserves(
      address(factory),
      tokenA,
      tokenB
    );

    if(reserveA == 0 && reserveB == 0) {
      (amountA, amountB) = (amountADesired, amountBDesired);
    } else {
      uint256 amountBOptimal = ZuniswapV2Library.quote(
        amountADesired,
        reserveA,
        reserveB
      );

      if(amountBOptimal <= amountBDesired) {
        if(amountBOptimal <= amountBMin) revert InsufficientBAmount();
        (amountA, amountB) = (amountADesired, amountBOptimal);
      } else {
        uint256 amountAOptimal = ZuniswapV2Library.quote(
          amountBDesired,
          reserveB,
          reserveA
        );
        assert(amountAOptimal<=amountADesired);
        if(amountAOptimal <= amountAMin) revert InsufficientAAmount();
        (amountA, amountB) = (amountAOptimal, amountBDesired);
      }
    }
  }
} 