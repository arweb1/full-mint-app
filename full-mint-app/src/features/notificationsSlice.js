import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        addNotification(state, action) {
            state.notifications.push(action.payload)
        },
        removeNotification(state, action) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
        }
    }
})

export const {
    addNotification,
    removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;