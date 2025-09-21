import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"; // Import dotenv for environment variables

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL!, // Loads URL from .env
      accounts: [process.env.PRIVATE_KEY!], // Loads private key from .env
      chainId: 43113,
    },
  },
  // This entire 'etherscan' block is optional but recommended.
  // It allows you to verify your contract on a block explorer after deployment.
  etherscan: {
    apiKey: {
      // You can get an API key from https://routescan.io/register
      // For now, leaving it as "YOUR_SNOWTRACE_API_KEY" is fine.
      avalancheFujiTestnet: process.env.ROUTESCAN_API_KEY!, 
    },
    customChains: [
      {
        network: "avalancheFujiTestnet",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avalanche.testnet.routescan.io"
        }
      }
    ]
  }
};

export default config;