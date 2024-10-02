import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const OrderBasedSwapModule = buildModule("OrderBasedSwapModule", (m) => {

    const orderSwap = m.contract("OrderBasedSwap");

    return { orderSwap };
});

export default OrderBasedSwapModule;


