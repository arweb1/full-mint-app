import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "../features/walletSlice";

const store = configureStore({
    reducer: {
        wallet: walletSlice
    },
    devTools: true
})

export default store;