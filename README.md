# Smart Wallet Contracts

## Overview
This project contains Solidity smart contracts for a Smart Wallet system. It includes a `SmartWallet` contract that allows users to manage their funds securely and a `SmartWalletProxy` contract for creating and managing individual `SmartWallet` instances per user.

## Features
- Proxy contract to manage the creation and destruction of smart wallet contracts.
- logic to ensure that each user gets a unique smart wallet contract address.
- A smart wallet contract that can delegate calls to other contracts like an EOA (Externally Owned Account).
- The smart wallet contract has the functionality to interact with other contracts, send and receive funds.
- the proxy contract can destroy a specific user's smart wallet contract and allow redeployment upon user request.
- Implemented functions to facilitate user interaction with the smart contracts through MetaMask


## License
This project is licensed under the MIT License.


# Installation Guide

## Prerequisites
- Node.js
- npm or yarn

## Setting up the Environment
1. Clone the repository: 
```
git clone https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory

```
2. Install dependencies:

cd [project-directory]
```
npm install
```

3. Set up environment variables by creating a `.env` file in the root directory with the following contents:
```
ALCHEMY_API_KEY=xxxxxxxxxxxxxxx
PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
POLYGONSCAN_API_KEY=xxxxxxxxxxxxxxxxxxxxxx
```


## Compiling Contracts
Run the following command to compile the smart contracts:
npx hardhat compile

# Usage Guide

## Deploying Contracts

To deploy the SmartWalletProxy contract, run:
```
npx hardhat run scripts/deploy.js --network [network-name]
```

contract deployment address will be displayed

plase that address in the app.js, where the contract address is required.

```
npm start
``` 




Deployment Images:
![Screenshot 2024-02-14 203259](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/e7aeb4a4-9fae-4d95-8893-c5f80bdea0ad)

![Screenshot 2024-02-14 191526](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/11a57759-8902-49a3-8c26-6933f56e9448)

![Screenshot 2024-02-14 191501](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/8dfc6aa1-014d-4c45-b53c-62c9ef8ebdec)

![Screenshot 2024-02-14 191456](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/fb8e9f33-6f52-4585-8181-2cf6278d032b)

![Screenshot 2024-02-14 191447](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/2dfd71fc-a70c-456f-a591-5e18c72cf534)

![Screenshot 2024-02-14 191406](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/ad764ccf-b12a-4dc5-ae16-f308a5ec9513)

![Screenshot 2024-02-14 191332](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/f01e2fba-453f-4a55-8cbd-f03c0a03d3ac)

![Screenshot 2024-02-14 191308](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/4ccea338-6c02-46da-9ddd-0b96b84c43b0)

![1 (7)](https://github.com/Danishlynx/Proxy_SmartWallet_with_Frontend/assets/69537135/178d28b2-8de5-4eb9-a5cd-a27de19f18dd)


![Screenshot 2024-02-14 191125](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/6bbc05e6-b70d-42e3-b8d5-6e93be1a9344)

![Screenshot 2024-02-14 191115](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/e7ffef92-31f8-4493-b0d8-ac6a916e96f2)

![Screenshot 2024-02-14 191107](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/bf652ecf-33ed-4428-8587-a9d447e38af0)

![Screenshot 2024-02-14 191052](https://github.com/Danishlynx/Proxy-SmartWallet_contract_factory/assets/69537135/f799a1bf-5898-4f79-876d-cf1afff53236)




