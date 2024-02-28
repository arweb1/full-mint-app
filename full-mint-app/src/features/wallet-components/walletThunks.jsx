import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setConnected, setBalance, setAddress } from './walletSlice';

export const connectWallet = createAsyncThunk(
    'wallet/connect',
    async (_, thunkAPI) => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log('Connected to MM: ', provider);

                const accounts = await provider.listAccounts();
                const userAddress = accounts[0];
                const balance = await provider.getBalance(userAddress);
                const formattedBalance = ethers.utils.formatEther(balance._hex)
                console.log('User Address', userAddress);

                thunkAPI.dispatch(setAddress(userAddress))
                thunkAPI.dispatch(setConnected(true));
                thunkAPI.dispatch(setBalance(formattedBalance))

                return userAddress;
            } catch (error) {
                console.error('error connecting MM: ', error)
                throw error;
            }
        } else {
            throw new Error("ETH is not supported on this brower")
        }
    }
);

export const updateBalance = createAsyncThunk(
    'wallet/updateBalance',
    async (_, thunkAPI) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const userAddress = accounts[0];
        const balance = await provider.getBalance(userAddress);
        const formattedBalance = parseFloat(balance).toFixed(2)
        console.log('User Address', userAddress);

        thunkAPI.dispatch(setBalance(formattedBalance));
    }
)