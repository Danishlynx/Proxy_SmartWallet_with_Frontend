import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import SmartWalletProxy from './artifacts/contracts/SmartWalletProxy.sol/SmartWalletProxy.json';
import SmartWallet from './artifacts/contracts/SmartWallet.sol/SmartWallet.json';


const smartWalletProxyAddress = "0x2b08E9fC5B070F8165068Bb2b673e0014cD3195A";

function App() {
  const [userAccount, setUserAccount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [hasWallet, setHasWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState('0');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [delegateTarget, setDelegateTarget] = useState('');
  const [delegateData, setDelegateData] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (walletAddress) {
      fetchWalletBalance();
    }
  }, [walletAddress]);

  async function requestAccount() {
    setLoading(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const [account] = await window.ethereum.request({ method: 'eth_accounts' });
      setUserAccount(account);
      await checkForExistingWallet(account);
    } catch (error) {
      setMessage('Failed to connect wallet. Please try again.');
    }
    setLoading(false);
  }

  async function checkForExistingWallet(account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const proxyContract = new ethers.Contract(smartWalletProxyAddress, SmartWalletProxy.abi, provider);
    try {
      const existingWalletAddress = await proxyContract.userToWallet(account);
      if (existingWalletAddress !== ethers.constants.AddressZero) {
        setWalletAddress(existingWalletAddress);
        setHasWallet(true);
        fetchWalletBalance(existingWalletAddress);
      } else {
        setHasWallet(false);
      }
    } catch (error) {
      setMessage('Failed to check for existing wallet.');
    }
  }

  async function createWallet() {
    if (!userAccount) {
      setMessage('Please connect to a wallet first.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const proxyContract = new ethers.Contract(smartWalletProxyAddress, SmartWalletProxy.abi, signer);
      const tx = await proxyContract.createWallet();
      await tx.wait();
      await checkForExistingWallet(userAccount);
      setMessage('Wallet created successfully.');
    } catch (error) {
      console.error('Error creating wallet:', error);
      setMessage('Failed to create wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function destroyWallet() {
    if (!walletAddress) {
      setMessage('No wallet to destroy.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const proxyContract = new ethers.Contract(smartWalletProxyAddress, SmartWalletProxy.abi, signer);
      const tx = await proxyContract.destroyWallet();
      await tx.wait();
      setHasWallet(false);
      setWalletAddress('');
      setMessage('Wallet destroyed successfully.');
    } catch (error) {
      console.error('Error destroying wallet:', error);
      setMessage('Failed to destroy wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchWalletBalance() {
    if (!walletAddress) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const smartWalletContract = new ethers.Contract(walletAddress, SmartWallet.abi, provider);
      const balance = await smartWalletContract.getBalance();
      setWalletBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setMessage('Failed to fetch wallet balance.');
    }
  }

  async function withdraw(amount) {
    if (!walletAddress) {
      setMessage('No wallet to withdraw from.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const smartWalletContract = new ethers.Contract(walletAddress, SmartWallet.abi, signer);
      const tx = await smartWalletContract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      await fetchWalletBalance();
      setMessage('Withdrawal successful.');
      setWithdrawAmount('');
    } catch (error) {
      console.error('Error withdrawing from wallet:', error);
      setMessage('Failed to withdraw. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function deposit(amount) {
    if (!walletAddress) {
      setMessage('No wallet to deposit to.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const smartWalletContract = new ethers.Contract(walletAddress, SmartWallet.abi, signer);
      const tx = await smartWalletContract.deposit({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      await fetchWalletBalance();
      setMessage('Deposit successful.');
      setDepositAmount('');
    } catch (error) {
      console.error('Error depositing to wallet:', error);
      setMessage('Failed to deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function delegate(target, data) {
    if (!walletAddress) {
      setMessage('No wallet to perform delegate call.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const smartWalletContract = new ethers.Contract(walletAddress, SmartWallet.abi, signer);
      const tx = await smartWalletContract.delegateCall(target, ethers.utils.arrayify(data));
      await tx.wait();
      setMessage('Delegate call executed successfully.');
      setDelegateTarget('');
      setDelegateData('');
    } catch (error) {
      console.error('Error executing delegate call:', error);
      setMessage('Failed to execute delegate call. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">Smart Wallet Interface</h1>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="content">
            {!userAccount ? (
              <button className="btn connect-btn" onClick={requestAccount}>Connect to Wallet</button>
            ) : (
              <div className="wallet-details">
                <p className="connected-account">Connected Account: {userAccount}</p>
                <div className="wallet-actions">
                  <button className="btn" onClick={createWallet} disabled={hasWallet}>Create Wallet</button>
                  <button className="btn" onClick={destroyWallet} disabled={!hasWallet}>Destroy Wallet</button>
                </div>
                {hasWallet && (
                  <div className="wallet-info">
                    <p>Wallet Address: {walletAddress}</p>
                    <p>Wallet Balance: {walletBalance} ETH</p>
                    <div className="transaction-group">
                      <input
                        type="text"
                        placeholder="Deposit Amount (ETH)"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="input-field"
                      />
                      <button className="btn" onClick={() => deposit(depositAmount)}>Deposit</button>
                    </div>
                    <div className="transaction-group">
                      <input
                        type="text"
                        placeholder="Withdraw Amount (ETH)"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="input-field"
                      />
                      <button className="btn" onClick={() => withdraw(withdrawAmount)}>Withdraw</button>
                    </div>
                    <div className="delegate-section">
                      <input
                        type="text"
                        placeholder="Delegate Target Address"
                        value={delegateTarget}
                        onChange={(e) => setDelegateTarget(e.target.value)}
                        className="input-field"
                      />
                      <input
                        type="text"
                        placeholder="Delegate Call Data (Hex)"
                        value={delegateData}
                        onChange={(e) => setDelegateData(e.target.value)}
                        className="input-field"
                      />
                      <button className="btn" onClick={() => delegate(delegateTarget, delegateData)}>Delegate Call</button>
                    </div>
                  </div>
                )}
                <p className="message">{message}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;