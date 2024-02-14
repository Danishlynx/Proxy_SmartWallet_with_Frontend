const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
async function main() {

// Verify the contract after deploying
await hre.run("verify:verify", {
address: "0x2b08E9fC5B070F8165068Bb2b673e0014cD3195A",
constructorArguments: [],
});
}
// Call the main function and catch if there is any error
main()
.then(() => process.exit(0))
.catch((error) => {
console.error(error);
process.exit(1);
});