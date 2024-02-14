const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SmartWallet", function () {
  let SmartWallet;
  let smartWallet;
  let owner;
  let destroyer;

  beforeEach(async function () {
    SmartWallet = await ethers.getContractFactory("SmartWallet");
    [owner, destroyer] = await ethers.getSigners();
    smartWallet = await SmartWallet.deploy(owner.address);
    await smartWallet.deployed();
  });

  it("Should have the correct owner", async function () {
    expect(await smartWallet.owner()).to.equal(owner.address);
  });

 

  it("Should withdraw funds correctly", async function () {
    // Deposit funds first
    const depositAmount = ethers.utils.parseEther("1");
    await owner.sendTransaction({ to: smartWallet.address, value: depositAmount });
  
    // Then withdraw funds
    const initialBalance = await ethers.provider.getBalance(owner.address);
    const withdrawAmount = ethers.utils.parseEther("0.5");
    await smartWallet.withdraw(withdrawAmount);
    const finalBalance = await ethers.provider.getBalance(owner.address);
  
    // Compare balances within a margin of error
    expect(finalBalance.sub(initialBalance)).to.be.closeTo(withdrawAmount, ethers.utils.parseEther("0.001"));
  });
  
});

describe("SmartWalletProxy", function () {
  let SmartWallet;
  let SmartWalletProxy;
  let smartWalletProxy;
  let owner;

  beforeEach(async function () {
    SmartWallet = await ethers.getContractFactory("SmartWallet");
    SmartWalletProxy = await ethers.getContractFactory("SmartWalletProxy");
    [owner] = await ethers.getSigners();
    smartWalletProxy = await SmartWalletProxy.deploy();
    await smartWalletProxy.deployed();
  });

  it("Should create a new wallet correctly", async function () {
    await smartWalletProxy.createWallet();
    const walletAddress = await smartWalletProxy.userToWallet(owner.address);
    expect(walletAddress).to.not.equal(ethers.constants.AddressZero);
  });

  it("Should destroy the wallet correctly", async function () {
    await smartWalletProxy.createWallet();
    const walletAddress = await smartWalletProxy.userToWallet(owner.address);
    await smartWalletProxy.destroyWallet();
    const destroyedWalletAddress = await smartWalletProxy.userToWallet(owner.address);
    expect(destroyedWalletAddress).to.equal(ethers.constants.AddressZero);
  });
});
