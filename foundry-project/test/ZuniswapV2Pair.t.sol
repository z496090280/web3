// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ZuniswapV2Pair.sol";
import "../src/solmate/tokens/ERC20.sol";

contract ERC20Mintable is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol, 18)
    {}

    function mint(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}

contract ZuniswapV2PairTest is Test {
    ZuniswapV2Pair pair;
    ERC20Mintable token0;
    ERC20Mintable token1;

    function setUp() public {
        token0 = new ERC20Mintable("TokenA", "TKNA");
        token1 = new ERC20Mintable("TokenB", "TKNB");
        pair = new ZuniswapV2Pair(address(token0), address(token1));

        token0.mint(10 ether);
        token1.mint(10 ether);
    }

    function testMintBootstrap() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);

        pair.mint();
        assertReserves(1 ether, 1 ether);
        assertEq(pair.balanceOf(address(this)), 1 ether - 1000);
        assertEq(pair.totalSupply(), 1 ether);
    }

    function testMintLiquidity() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);

        pair.mint(); // +1 LP

        token0.transfer(address(pair), 2 ether);
        token1.transfer(address(pair), 2 ether);

        pair.mint(); // +2 LP

        assertEq(pair.balanceOf(address(this)), 3 ether - 1000);
        assertReserves(3 ether, 3 ether);
        assertEq(pair.totalSupply(), 3 ether);
    }

    // 测试不安正常比例
    function testMintUnbalanced() public {
        // 这里 1 / 2 ether 都将得到 1 ether的奖励
        token0.transfer(address(pair), 1 ether);
        // token0.transfer(address(pair), 2 ether);
        token1.transfer(address(pair), 1 ether);

        pair.mint(); // +1 LP

        assertEq(pair.balanceOf(address(this)), 1 ether - 1000);
        // assertReserves(1 ether, 1 ether);
        // assertEq(pair.totalSupply(), 1 ether);
    }

    function assertReserves(uint112 reserve0, uint112 reserve1) public {
        (uint112 _reserve0, uint112 _reserve1) = pair.getReserves();
        assertEq(_reserve0, reserve0, "_reserve0");
        assertEq(_reserve1, reserve1, "_reserve1");
    }

    function testBurn() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);

        pair.mint();

        uint256 liquidity = pair.balanceOf(address(this));
        pair.transfer(address(pair), liquidity);
        pair.burn(address(this));

        assertEq(pair.balanceOf(address(this)), 0);
        assertReserves(1000, 1000);
        assertEq(token0.balanceOf(address(this)), 10 ether - 1000);
        assertEq(token1.balanceOf(address(this)), 10 ether - 1000);
    }

    function testBurnUnbalanced() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);
        pair.mint();

        token0.transfer(address(pair), 2 ether);
        token1.transfer(address(pair), 1 ether);
        pair.mint();

        uint256 liquidity = pair.balanceOf(address(this));
        pair.transfer(address(pair), liquidity);
        pair.burn(address(this));

        assertEq(pair.balanceOf(address(this)), 0);
        assertReserves(1500, 1000);
        assertEq(token0.balanceOf(address(this)), 10 ether - 1500);
        assertEq(token1.balanceOf(address(this)), 10 ether - 1000);
    }
}
