import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../walletThunks';
import { setAddress } from '../walletSlice';

function ConnectWallet() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(state => state.wallet.address.payload);
    const isConnected = useSelector(state => state.wallet.isConnected)
    const walletBalance = useSelector(state => state.wallet.balance)
    const select = useSelector(state => state)
    

    const handleWalletConnect = () => {
        console.log('click')
        dispatch(connectWallet())
    }

    // useEffect(() => {
    //     dispatch(connectWallet())
    //         .then(address => {
    //             dispatch(setAddress(address))
    //         })
    //         .catch(error => {
    //             console.log('Wallet connection error: ', error)
    //         })
    // }, [dispatch])
  return (
    <div>
        {isConnected ? (
            <div>
                <p>Connected Address: {walletAddress}</p>
                <p>Balance: {walletBalance}</p>
            </div>
        ) : (
            <button onClick={handleWalletConnect}>Connect Wallet </button>
        )}
    </div>
  )
}

export default ConnectWallet