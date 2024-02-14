// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartWallet {
    address public owner;
    address private authorizedDestroyer;

    event Deposit(address indexed sender, uint amount);
    event Withdrawal(address indexed receiver, uint amount);

    constructor(address _owner) {
        owner = _owner;
        authorizedDestroyer = msg.sender; // Set the creator of the SmartWalletProxy as the authorized destroyer
    }

    function authorizeDestroyer(address _destroyer) external {
        require(msg.sender == owner, "Only the owner can authorize a destroyer");
        authorizedDestroyer = _destroyer;
    }

    function destroy() external {
        require(msg.sender == owner || msg.sender == authorizedDestroyer, "Caller is not authorized to destroy");
        selfdestruct(payable(owner));
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "Caller is not owner");
        require(address(this).balance >= _amount, "Insufficient balance");
        payable(owner).transfer(_amount);
        emit Withdrawal(owner, _amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        emit Deposit(msg.sender, msg.value);
    }
}
