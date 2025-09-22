# VahanChain: Decentralized Driver Safety & Identity on Avalanche

## Table of Contents
1.  [Introduction](#1-introduction)
2.  [Problem Statement](#2-problem-statement)
3.  [Solution](#3-solution)
4.  [Key Features](#4-key-features)
5.  [Technology Stack](#5-technology-stack)
6.  [Smart Contract Details](#6-smart-contract-details)
7.  [Project Structure](#7-project-structure)
8.  [Setup and Installation](#8-setup-and-installation)
    * [Prerequisites](#prerequisites)
    * [Backend (Hardhat Smart Contract)](#backend-hardhat-smart-contract)
        * [Environment Setup](#environment-setup)
        * [Install Hardhat Dependencies](#install-hardhat-dependencies)
        * [Compile Contract](#compile-contract)
        * [Deploy Contract](#deploy-contract)
        * [Verify Contract (Optional)](#verify-contract-optional)
    * [Frontend (React Native Expo App)](#frontend-react-native-expo-app)
        * [WalletConnect Project ID](#walletconnect-project-id)
        * [App Deep Link Scheme](#app-deep-link-scheme)
        * [Contract Address and ABI](#contract-address-and-abi)
        * [Install Frontend Dependencies](#install-frontend-dependencies)
        * [Configure Babel for Hermes](#configure-babel-for-hermes)
        * [Run the App](#run-the-app)
9.  [How to Use the App](#9-how-to-use-the-app)
10. [Future Enhancements](#10-future-enhancements)
11. [Contributing](#11-contributing)
12. [License](#12-license)
13. [Contact](#13-contact)

## 1. Introduction

VahanChain is an innovative decentralized application (dApp) built on the Avalanche blockchain, designed to revolutionize driver identity and safety. This project aims to create a trustworthy and transparent system for evaluating and verifying driver safety using Soulbound Tokens (SBTs).

## 2. Problem Statement

Traditional driver safety records are often centralized, opaque, and susceptible to manipulation or limited access. There's a lack of a universally verifiable, immutable, and privacy-preserving system for drivers to carry their safety credentials across different platforms (e.g., ride-sharing, logistics, insurance).

## 3. Solution

VahanChain introduces a **SafeDriverSBT** – a non-transferable Soulbound Token – to represent a driver's unique identity and safety score on the Avalanche Fuji Testnet. This SBT acts as a decentralized, verifiable credential that cannot be bought, sold, or transferred, ensuring its integrity as a personal identifier. The contract owner (e.g., a regulatory body, an insurance company, or the VahanChain admin) can mint these SBTs to verified drivers and update their associated safety scores based on real-world driving behavior, accident history, or performance metrics.

## 4. Key Features

* **Soulbound Token (SBT) for Drivers:** Unique, non-transferable digital identity token for each driver.
* **Decentralized Safety Scoring:** Each SBT is associated with an an immutable safety score, stored on the Avalanche blockchain.
* **Owner-Controlled Minting & Updates:** A designated contract owner has the authority to mint new SBTs to drivers and update their safety scores.
* **Transparent Verification:** Any dApp or service can verify a driver's SBT and retrieve their current safety score by querying the blockchain.
* **React Native Mobile Frontend:** A user-friendly mobile application that allows drivers to connect their wallets, view their SBT status, and see their safety score. Contract owners can also mint SBTs and update scores directly from the app.
* **WalletConnect Integration:** Seamless wallet connection for a wide range of mobile wallets.

## 5. Technology Stack

* **Blockchain:** Avalanche (Fuji Testnet)
* **Smart Contracts:** Solidity
* **Development Environment:** Hardhat
* **Frontend:** React Native (Expo)
* **Web3 Libraries:**
    * `wagmi`: React Hooks for Ethereum.
    * `@web3modal/wagmi-react-native`: WalletConnect v2 integration for React Native.
* **Package Manager:** npm / yarn
* **JavaScript Runtime:** Node.js

## 6. Smart Contract Details

The core of VahanChain is the `SafeDriverSBT.sol` smart contract.

* **Contract Name:** `SafeDriverSBT`
* **Token Standard:** ERC721 (modified for Soulbound properties - `_beforeTokenTransfer` prevents transfers)
* **Key Functions:**
    * `constructor()`: Sets the deployer as the initial owner.
    * `owner()`: Returns the address of the contract owner.
    * `mint(address to)`: Allows the owner to mint a new SBT to `to`. Initializes safety score to 100.
    * `hasSBT(address)`: Checks if an address holds a SafeDriverSBT.
    * `getSafetyScore(address driver)`: Retrieves the safety score of a given driver.
    * `updateSafetyScore(address driver, uint256 newScore)`: Allows the owner to update the safety score of an existing SBT holder.
    * `_beforeTokenTransfer`: Overrides the ERC721 transfer function to prevent any token transfers, making it soulbound.

## 7. Project Structure

The repository is structured into two main parts:
```
VahanChain-Hackathon/
├── hardhat/                    # Smart Contract Development (Hardhat project)
│   ├── contracts/              # Solidity smart contracts
│   │   └── SafeDriverSBT.sol
│   ├── scripts/                # Deployment scripts
│   ├── test/                   # Contract tests
│   ├── hardhat.config.ts       # Hardhat configuration
│   └── package.json            # Hardhat dependencies
└── frontend/                   # React Native Mobile App (Expo project)
├── App.tsx                 # Main application component
├── babel.config.js         # Babel configuration for Expo
├── app.json                # Expo project configuration
├── src/
│   └── constants/index.ts  # WalletConnect ID, Contract Address, ABI
├── assets/                 # App assets (icons, splash screen)
└── package.json            # Frontend dependencies
```

## 8. Setup and Installation

Follow these steps to set up and run the VahanChain project locally.

### Prerequisites

* **Node.js (LTS recommended):** [Download & Install](https://nodejs.org/en/download/)
* **npm:** Comes with Node.js
* **Git:** [Download & Install](https://git-scm.com/downloads)
* **Expo Go App:** Install on your physical Android/iOS device or use an emulator.
    * [Android (Google Play)](https://play.google.com/store/apps/details?id=com.expo.client)
    * [iOS (App Store)](https://apps.apple.com/us/app/expo-go/id1394474973)
* **A Web3 Wallet:** e.g., MetaMask, Core Wallet (mobile app for testing WalletConnect).
* **Test AVAX on Fuji Testnet:** You'll need some test tokens for deploying and interacting with the contract. Get them from the [Avalanche Faucet](https://faucet.avax.network/).

### Backend (Hardhat Smart Contract)

Navigate to the `hardhat` directory to set up the smart contract.

```bash
cd VahanChain-Hackathon/hardhat

1. **Environment Setup** → Create `.env` file:
```ini
PRIVATE_KEY="YOUR_PRIVATE_KEY"
FUJI_RPC_URL="https://api.avax-test.network/ext/bc/C/rpc"
SNOWTRACE_API_KEY="YOUR_SNOWTRACE_API_KEY"
```

2. **Install dependencies**:
```bash
npm install
```

3. **Compile contracts**:
```bash
npx hardhat compile
```

4. **Deploy**:
```bash
npx hardhat run scripts/deploy.ts --network fuji
```

5. **Verify (optional)**:
```bash
npx hardhat verify --network fuji YOUR_DEPLOYED_CONTRACT_ADDRESS
```

---

### Frontend (React Native Expo App)
```bash
cd VahanChain-Hackathon/frontend
```

1. **WalletConnect Project ID** → Update `src/constants/index.ts`.  
2. **Deep Link Scheme** → Update `app.json`.  
3. **Contract Address + ABI** → Update `src/constants/index.ts`.  
4. **Install dependencies**:
```bash
npm install
npm install babel-preset-expo --save-dev
```

5. **Configure Babel** (`babel.config.js`):
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { unstable_transformImportMeta: true }]],
  };
};
```

6. **Run app**:
```bash
npm start -- --clear
```

---

## 9. How to Use the App
- Connect Wallet (via WalletConnect)  
- View SBT status & safety score  
- If owner → mint/update SBTs  

---

## 10. Future Enhancements
- UI for minting/updating SBTs  
- Driver search & historical score tracking  
- Improved UI/UX & error handling  
- Wallet disconnect button  
- Universal link setup  
- Token-gated dApp integrations  

---

## 11. Contributing
Contributions are welcome! Please open issues or submit PRs.

---

## 12. License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 13. Contact
- **Twitter/X:** [@LakshyaSingh](https://x.com/Lakshya81810899)  
- **Website:** [@LakshyaSingh](https://lakshyasingh.com)
