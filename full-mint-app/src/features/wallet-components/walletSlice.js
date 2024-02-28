import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: null,
        balance: null,
        isConnected: false
    },
    reducers: {
        setAddress(state, action){
            state.address = action.payload;
        },
        setBalance(state, action){
            state.balance = action.payload
        },
        setConnected(state, action){
            state.isConnected = action.payload
        }
    }
})

export const {
    setAddress,
    setBalance,
    setConnected} = walletSlice.actions;
export default walletSlice.reducer;