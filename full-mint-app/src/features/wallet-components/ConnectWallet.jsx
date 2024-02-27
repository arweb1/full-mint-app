import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { connectWallet, updateBalance } from '../walletThunks';
import { setAddress, setBalance, setConnected } from '../walletSlice';
import { ethers } from 'ethers';

import './ConnectWallet.scss';

import copyImage from '../../storage/images/copy-svgrepo-com.svg';

function ConnectWallet() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(state => state.wallet.address ? state.wallet.address : null);
    const isConnected = useSelector(state => state.wallet.isConnected);
    const walletBalance = useSelector(state => state.wallet.balance);

    const [isWalletOptionsOpen, setIsWalletOptionsOpen] = useState(false);

    //Wallet connect
    const handleWalletConnect = () => {
        dispatch(connectWallet())
    }
    //Addreess wallet update
    // useEffect(() => {
    //     dispatch(connectWallet())
    //         .then(address => {
    //             dispatch(setAddress(address))
    //         })
    //         .catch(error => {
    //             console.log('Wallet connection error: ', error)
    //         })

    // }, [dispatch])

    //Balance update real time
    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const handleAccountsChanged = accounts => {
            if (accounts.length > 0) {
                const userAddress = accounts[0];
                provider.getBalance(userAddress).then(balance => {
                    const formattedBalance = ethers.utils.formatEther(balance)
                    dispatch(setAddress(userAddress));
                    dispatch(updateBalance(formattedBalance));
                });
            } else {
                dispatch(setConnected(false));
            }
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [dispatch]);

    //Open Wallet options

    const toggleWalletOptionsOpen = () => {
        setIsWalletOptionsOpen(!isWalletOptionsOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const walletOptionsElement = document.querySelector('.walletOptions');
            const walletInfo = document.querySelector('.walletInfo');
            const copyWallet = document.querySelector('.copyWallet')
            console.log(event.target)
            if (walletOptionsElement && !walletOptionsElement.contains(event.target) && !walletInfo.contains(event.target) && !copyWallet.contains(event.target)) {
                setIsWalletOptionsOpen(false);
            }
        };

        if (isWalletOptionsOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isWalletOptionsOpen]);


    //Wallet disconnect update

    //Wallet Mask
    const handleWalletMask = wallet => {
        const visibleCharacters = 6;
        const maskedAddress = `${wallet.slice(0, visibleCharacters)}...${wallet.slice(-4)}`;
        return maskedAddress
    }

    //disconnect 
    const handleDisconnectWallet = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts', params: [] })
                dispatch(setAddress(null))
                dispatch(setBalance(null))
                dispatch(setConnected(false))
            } else {
                console.log('Something wrong with MetaMask')
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    //Copy on Click
    const handleWalletCopy = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress)
                .then(() => {
                    console.log('Copied')
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        }
    }

    return (
        <div>
            {isConnected ? (
                <div className='connectedWallet' >
                    <div className="walletInfo" onClick={toggleWalletOptionsOpen}>
                        <div className="wallet">
                            <p>{walletAddress ? handleWalletMask(walletAddress) : "Can't load"}</p>
                            <img
                                src={copyImage}
                                alt="Copy"
                                className='copyWallet'
                                onClick={e => {
                                    handleWalletCopy();
                                    e.stopPropagation();
                                }} />
                        </div>
                        <p>Balance: {walletBalance ? parseFloat(walletBalance).toFixed(2) : "Loading..."}E</p>
                    </div>
                    {isWalletOptionsOpen && (
                        <div className="walletOptions">
                            <ul>
                                <li onClick={handleDisconnectWallet}>Disconnect</li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button className='connectBtn' onClick={handleWalletConnect}>Connect Wallet </button>
            )}
        </div>
    )
}

export default ConnectWallet