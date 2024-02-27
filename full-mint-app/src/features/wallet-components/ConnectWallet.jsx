import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { connectWallet, updateBalance } from '../walletThunks';
import { setAddress, setConnected } from '../walletSlice';
import { ethers } from 'ethers';

function ConnectWallet() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(state => state.wallet.address ? state.wallet.address : null);
    const isConnected = useSelector(state => state.wallet.isConnected)
    const walletBalance = useSelector(state => state.wallet.balance)
    const select = useSelector(state => state)
    console.log(select)

    const handleWalletConnect = () => {
        console.log('click')
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
    
    //Wallet disconnect update

    //Wallet Mask

    const handleWalletMask = wallet => {
        const visibleCharacters = 6;
        const maskedAddress = `${wallet.slice(0, visibleCharacters)}...${wallet.slice(-4)}`;
        return maskedAddress
    }
    
    
    return (
        <div>
            {isConnected ? (
                <div>
                    <p>Connected Address: {walletAddress ? handleWalletMask(walletAddress) : "Can't load"}</p>
                    <p>Balance: {walletBalance ? parseFloat(walletBalance).toFixed(2) : "Loading..."}</p>
                </div>
            ) : (
                <button onClick={handleWalletConnect}>Connect Wallet </button>
            )}
        </div>
    )
}

export default ConnectWallet