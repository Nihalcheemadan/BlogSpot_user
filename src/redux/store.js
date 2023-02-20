import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
// import postReducer from './postSlice'
import chatSlice from './socketSlice'

export default configureStore({
    reducer:{
        auth: authReducer,
        // post: postReducer,
        // chat: chatSlice
    }
})