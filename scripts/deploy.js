const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );


  const SmartWalletProxy = await hre.ethers.getContractFactory("SmartWalletProxy");
  const smartwalletproxy = await SmartWalletProxy.deploy();

  await smartwalletproxy.deployed();

  console.log("Token deployed to:", smartwalletproxy.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });