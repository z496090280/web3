// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./libraries/Math.sol";
import "./solmate/tokens/ERC20.sol";

interface IERC20 {
    function balanceOf(address) external returns (uint256);

    function transfer(address to, uint256 amount) external;
}

error InsufficientLiquidityMinted();
error InsufficientLiquidityBurned();
error InsufficientOutoutAmount();
error InsufficientLiquidity();
error TransferFailed();
error InvalidK();

contract ZuniswapV2Pair is ERC20 {
    uint256 constant MINIMUM_LIQUIDITY = 1000;
    address public token0;
    address public token1;

    uint112 private reserve0;
    uint112 private reserve1;

    event Burn(address indexed sender, uint256 amount0, uint256 amount1);
    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Sync(uint256 reserve0, uint256 reserve1);
    event Swap(address indexed sender, uint256 amount0Out,uint256 amount1Out, address indexed to);

    constructor(address token0_, address token1_)
        ERC20("ZuniswapV2 Pair", "ZUNIV2", 18)
    {
        token0 = token0_;
        token1 = token1_;
    }

    // 添加流动性
    function mint() public {
        (uint112 _reserve0, uint112 _reserve1) = getReserves();
        uint256 balance0 = IERC20(token0).balanceOf(address(this));
        uint256 balance1 = IERC20(token1).balanceOf(address(this));
        // 计算资产流通差额
        uint256 amount0 = balance0 - reserve0;
        uint256 amount1 = balance1 - reserve1;

        uint256 liquidity;

        if (totalSupply == 0) {
            liquidity = Math.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(0), MINIMUM_LIQUIDITY);
        } else {
            liquidity = Math.min(
                (totalSupply * amount0) / _reserve0,
                (totalSupply * amount1) / _reserve1
            );
        }

        if (liquidity <= 0) revert InsufficientLiquidityMinted();

        _mint(msg.sender, liquidity);

        _update(balance0, balance1);

        emit Mint(msg.sender, amount0, amount1);
    }

    // 移除流动性
    function burn(address to)
        public
        returns (uint256 amount0, uint256 amount1)
    {
        uint256 balance0 = IERC20(token0).balanceOf(address(this));
        uint256 balance1 = IERC20(token1).balanceOf(address(this));

        uint256 liquidity = balanceOf[address(this)];
        amount0 = (liquidity * balance0) / totalSupply;
        amount1 = (liquidity * balance1) / totalSupply;

        _burn(address(this), liquidity);
        _safeTransfer(token0, to, amount0);
        _safeTransfer(token1, to, amount1);

        balance0 = IERC20(token0).balanceOf(address(this));
        balance1 = IERC20(token1).balanceOf(address(this));
        _update(balance0, balance1);

        emit Burn(msg.sender, amount0, amount1);
    }

    function swap(uint256 amount0Out, uint256 amount1Out, address to) public {
      if(amount0Out == 0 && amount1Out == 0) {
        revers InsufficientOutoutAmount();
      }
      (uint112 reserve0_, uint112 reserve1_) = getReserves();
      if(amount0Out > reserve0_ || amount1Out > reserve1_) {
        revers InsufficientLiquidity();
      }

      uint256 balance0 = IERC20(token0).balanceOf(address(this)) -amount0Out;
      uint256 balance1 = IERC20(token1).balanceOf(address(this)) - amount1Out;

      if(balance0 * balance1 < uint256(reserve0_) * uint256(reserve1_)) {
        revert InvalidK();
      }
      _update(balance0, balance1);
      if(amount0Out > 0) _safeTransfer(token0, to, amount0Out);
      if(amount1Out > 0) _safeTransfer(token0, to, amount1Out);
      emit Swap(msg.sender, amount0Out, amount1Out, to);
    }

    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature("transfer(address,uint256)", to, value)
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool)))) {
            revert TransferFailed();
        }
    }

    function getReserves() public view returns (uint112, uint112) {
        return (reserve0, reserve1);
    }

    function _update(uint256 balance0, uint256 balance1) private {
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);

        emit Sync(reserve0, reserve1);
    }
}
