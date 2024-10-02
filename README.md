# OrderBasedSwap Contract

## Overview
The `OrderBasedSwap` contract is a decentralized token swapping solution built on Solidity. It allows users to create and execute token swap orders in a permissionless manner. Users can deposit tokens to create swap orders, and other users can fulfill these orders by exchanging their tokens as specified.

## Features
- **Order Creation**: Users can create new orders by depositing tokens, specifying the desired token and amount in return.
- **Token Swap**: Other users can fulfill existing orders, swapping their tokens as specified.
- **Security Checks**: The contract enforces balance and allowance checks before executing any transactions.

---

## Contract Functions

### `depositToken`
- **Description**: Creates a new swap order by depositing a specified amount of the maker token.
- **Parameters**:
  - `_amount` (uint256): The amount of the maker token to deposit.
  - `_makerToken` (address): The address of the token being deposited by the user.
  - `_takerToken` (address): The address of the token the user wants in return.
  - `_takerAmt` (uint256): The amount of the taker token the user expects in exchange.
- **Requirements**:
  - The caller must not be the zero address.
  - `_amount` must be greater than zero.
  - The caller must have sufficient token balance and allowance for the contract.
  - The order must not already exist.
- **Effects**:
  - Creates a new order and stores it in the `order` mapping.
  - Increments the `orderId`.
  - Transfers the maker token to the contract.
  - Updates the `balances` mapping.
- **Returns**: None.

### `swapOrder`
- **Description**: Executes a swap by fulfilling an existing order.
- **Parameters**:
  - `_orderId` (uint256): The ID of the order to be fulfilled.
- **Requirements**:
  - The caller must not be the zero address.
  - The specified order must exist and have the required tokens deposited.
  - The caller must have sufficient balance and allowance for the taker token.
- **Effects**:
  - Transfers the taker token from the caller to the order creator.
  - Transfers the maker token from the contract to the caller.
- **Returns**: None.

---

## Contract Variables

### `orderId`
- **Type**: `uint256`
- **Description**: Stores the current order ID.

### `order`
- **Type**: `mapping(uint256 => Order)`
- **Description**: Maps order IDs to their respective `Order` structs.

### `balances`
- **Type**: `mapping(address => uint256)`
- **Description**: Keeps track of user balances for deposited tokens.

---

## Structs

### `Order`
- **Description**: Represents a swap order created by a user.
- **Variables**:
  - `makerToken` (address): The address of the token being offered.
  - `takerToken` (address): The address of the token expected in exchange.
  - `makerAmt` (uint256): The amount of the maker token.
  - `takerAmt` (uint256): The amount of the taker token.
  - `userDeposited` (bool): Indicates if the user has deposited the maker token.
  - `creator` (address): The creator of the order.

---

## Security Considerations
- **Allowance Checks**: Ensure that allowances are properly set before any transfers.
- **Zero Address Check**: The contract prevents actions from the zero address to avoid edge-case vulnerabilities.

---

## License
This contract is licensed under the **UNLICENSED** license.
