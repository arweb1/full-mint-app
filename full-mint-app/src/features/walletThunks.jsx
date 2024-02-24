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
                const userAddres = accounts[0];
                const balance = await provider.getBalance(userAddres);
                const formattedBalance = parseFloat(balance).toFixed(2)
                console.log('User Address', userAddres);

                thunkAPI.dispatch(setAddress(userAddres))
                thunkAPI.dispatch(setConnected(true));
                thunkAPI.dispatch(setBalance(formattedBalance))

                return userAddres;
            } catch (error){
                console.error('error connecting MM: ', error)
                throw error;
            }
        }else{
            throw new Error("ETH is not supported on this brower")
        }
    }
);