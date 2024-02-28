import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "../features/wallet-components/walletSlice";
import notificationsSlice from "../features/notificationsSlice";

const store = configureStore({
    reducer: {
        wallet: walletSlice,
        notifications: notificationsSlice
    },
    devTools: true
})

export default store;