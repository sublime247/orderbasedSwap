// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OrderBasedSwap {
    struct Order {
        address makerToken;
        address takerToken;
        uint256 makerAmt;
        uint256 takerAmt;
        bool userDeposited;
        address creator;
    }
    uint256 public orderId;

    mapping(uint256 => Order) public order;
    mapping(address => uint256) public balances;

    function depositToken(
        uint256 _amount,
        address _makerToken,
        address _takerToken,
        uint256 _takerAmt
    ) external {
        require(msg.sender != address(0), "Zero Address detected");
        require(_amount > 0, "Amount needs to be more than zero");
        uint256 _orderId = orderId + 1;
        Order storage _order = order[_orderId];
        require(!_order.userDeposited, "You deposited Already");
        _order.makerToken = _makerToken;
        _order.takerToken = _takerToken;
        _order.creator = msg.sender;
        _order.takerAmt = _takerAmt;

        uint userTokenBal = IERC20(_order.makerToken).balanceOf(msg.sender);

        require(userTokenBal >= _amount, "Insufficient Token Balance");
        _order.makerAmt += _amount;
        require(
            IERC20(_order.makerToken).allowance(msg.sender, address(this)) >=
                _amount,
            "Token allowance too low"
        );
        IERC20(_order.makerToken).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        _order.userDeposited = true;

        balances[msg.sender] += _amount; // Accumulate deposits

        orderId += 1;
    }

    function swapOrder(uint256 _orderId) external {
        require(msg.sender != address(0), "Zero Address detected");
        Order storage _order = order[_orderId];
        require(_order.userDeposited, "you have no token deposited");

        // Ensure the taker has enough balance and allowance for the swap
        require(
            IERC20(_order.takerToken).balanceOf(msg.sender) >= _order.takerAmt,
            "Insufficient taker token balance"
        );
        require(
            IERC20(_order.takerToken).allowance(msg.sender, address(this)) >=
                _order.takerAmt,
            "Allow to transfer sufficient Amount"
        );

        // Transfer taker tokens to the creator
        IERC20(_order.takerToken).transferFrom(
            msg.sender,
            _order.creator,
            _order.takerAmt
        );

        // Transfer maker tokens to the taker
        IERC20(_order.makerToken).transfer(msg.sender, _order.makerAmt);
    }
}
