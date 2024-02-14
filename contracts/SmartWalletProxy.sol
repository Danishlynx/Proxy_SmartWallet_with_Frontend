// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SmartWallet.sol";

contract SmartWalletProxy {
    mapping(address => address) public userToWallet;

    event WalletCreated(address indexed user, address walletAddress);
    event WalletDestroyed(address indexed walletAddress);

    function createWallet() external {
        require(userToWallet[msg.sender] == address(0), "Wallet already exists for user");

        // Create a new SmartWallet with the message sender as the owner
        SmartWallet newWallet = new SmartWallet(msg.sender);
        userToWallet[msg.sender] = address(newWallet);

        emit WalletCreated(msg.sender, address(newWallet));
    }

    function destroyWallet() external {
        address walletAddress = userToWallet[msg.sender];
        require(walletAddress != address(0), "No wallet exists for user");

        // Convert walletAddress to an address payable
        address payable walletPayableAddress = payable(walletAddress);

        // Now cast walletPayableAddress to SmartWallet and call destroy
        SmartWallet(walletPayableAddress).destroy();

        // Remove the wallet from the mapping after destruction
        delete userToWallet[msg.sender];

        emit WalletDestroyed(walletAddress);
    }
}
