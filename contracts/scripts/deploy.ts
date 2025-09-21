import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SafeDriverSBT contract...");

  // Gets the compiled contract
  const SafeDriverSBT = await ethers.getContractFactory("SafeDriverSBT");

  // Sends the transaction to deploy the contract
  const safeDriverSBT = await SafeDriverSBT.deploy();

  // CORRECT: Waits for the deployment to be confirmed on the blockchain
  await safeDriverSBT.waitForDeployment();

  // CORRECT: Prints the new contract's public address using .target
  console.log(
    `SafeDriverSBT deployed successfully to: ${safeDriverSBT.target}`
  );
}

// Standard pattern to handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});