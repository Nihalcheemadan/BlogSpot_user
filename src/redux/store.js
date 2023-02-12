import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
import postReducer from './postSlice'

export default configureStore({
    reducer:{
        auth: authReducer,
        post: postReducer,
    }
})