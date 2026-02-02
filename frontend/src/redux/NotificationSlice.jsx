import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";




export const NotificationSlice = createSlice({
    name:"notification",
    initialState:{
       items:[],
       unreadCount:0 
    },
    reducers:{
        addNotification:(state,action)=>{
            state.items.unshift({...action.payload})
            state.unreadCount += 1
        },
        MarkedAllRead:(state)=>{
            state.items = state.items.map((n)=>({
                ...n,isRead:true
            }))
            state.unreadCount = 0
        },
        resetNotifications:()=>({
            items:[],
            unreadCount:0
        })
    }
})

export const {addNotification,MarkedAllRead,resetNotifications} = NotificationSlice.actions
const persistconfig = {
    key:"notification",
    storage:sessionStorage
}
export const persistedNotificationReducer = persistReducer(persistconfig,NotificationSlice.reducer)