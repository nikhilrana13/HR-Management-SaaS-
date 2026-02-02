import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import persistStore from "redux-persist/es/persistStore";
import { NotificationSlice } from "./NotificationSlice";


const userpersistconfig={
    key:'Auth',
    storage:sessionStorage
}

const notificationpersistconfig={
    key:'notification',
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const persistconfignotification = persistReducer(notificationpersistconfig,NotificationSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    notification:persistconfignotification
})
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})
export const persistor = persistStore(store) 


