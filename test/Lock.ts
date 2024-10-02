// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import hre from "hardhat";

// describe("OrderSawp", function () {
//   async function deployTokenA() {
//     const [owner] = await hre.ethers.getSigners();
//     const TokenA = await hre.ethers.getContractFactory("TokenA");
//     const tokenA = await TokenA.deploy();
//     return {owner, tokenA};
//   }
//   async function deployTokenB() {
//     const [owner] = await hre.ethers.getSigners();
//     const TokenB = await hre.ethers.getContractFactory("TokenB");
//     const tokenB = await TokenB.deploy();
//     return {owner, tokenB};
    
//   }

//   async function deploySwap() {
//     const [owner, otherAccount, otherAccount2] = await hre.ethers.getSigners();
//     const Swap = await hre.ethers.getContractFactory("OrderBasedSwap");
//     const swap = await Swap.deploy();
//     const { tokenA } = await loadFixture(deployTokenA);
//     const { tokenB } =await  loadFixture(deployTokenB);
//     await tokenA.transfer(otherAccount, hre.ethers.parseUnits("1000", 18));
//     // await tokenB.transfer(otherAccount, hre.ethers.parseUnits("1000", 18));
//     // await tokenA.transfer(otherAccount2, hre.ethers.parseUnits("1000", 18));
//     await tokenB.transfer(otherAccount2, hre.ethers.parseUnits("1000", 18));
//     return {owner, swap, otherAccount, otherAccount2, tokenA, tokenB };
    
//   }

//   describe("Deployment", function () {
//     it("Should check if user deposited correctly", async function () {
//       const { owner, swap, otherAccount, otherAccount2, tokenA, tokenB } = await loadFixture(deploySwap);

     
//       const amtA = hre.ethers.parseUnits("100", 18);
//       const amtB = hre.ethers.parseUnits("100", 18);
//       const useramtB = hre.ethers.parseUnits("100", 18);
//       const useramtA = hre.ethers.parseUnits("100", 18);
//     // Approve the Swap contract to spend tokens on behalf of otherAccount
//           await tokenA.connect(otherAccount).approve(swap, amtA);
//           await tokenB.connect(otherAccount).approve(swap, amtB);
//           await tokenA.connect(otherAccount2).approve(swap, useramtB);
//           await tokenB.connect(otherAccount2).approve(swap, useramtA);
//       await swap.connect(otherAccount).depositToken(amtA, tokenA, tokenB, amtB );
//       // await swap.connect(otherAccount).depositToken(amtA, tokenA, tokenB, amtB );
//       await swap.connect(otherAccount2).depositToken(useramtB, tokenA, tokenB, useramtA );
//       expect(await swap.orderId()).to.equal(2);
//       expect(await swap.balances(otherAccount)).to.equal(amtA);

//     });
//   });
//   describe("Swap", function () {
//     it("Should check if user swap correctly", async function () {
//       const { owner, swap, otherAccount, otherAccount2, tokenA, tokenB } = await loadFixture(deploySwap);

      
//       const amtA = hre.ethers.parseUnits("10", 18);
//       const amtB = hre.ethers.parseUnits("100", 18);
//       const useramtB = hre.ethers.parseUnits("10", 18);
//       const useramtA = hre.ethers.parseUnits("100", 18);
//     // Approve the Swap contract to spend tokens on behalf of otherAccount
//           await tokenA.connect(otherAccount).approve(swap, amtA);
//           await tokenB.connect(otherAccount).approve(swap, amtB);
//           await tokenA.connect(otherAccount2).approve(swap, useramtB);
//           await tokenB.connect(otherAccount2).approve(swap, useramtA);
//       await swap.connect(otherAccount).depositToken(amtA, tokenA, tokenB, amtB );
//       // await swap.connect(otherAccount).depositToken(amtA, tokenA, tokenB, amtB );
//       await swap.connect(otherAccount).swapOrder(1);
//       // expect(await swap.orderId()).to.equal(2);
// ;

//     });
//   });


// });
