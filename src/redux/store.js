import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth"
import categorySlice from "./slices/categorySlice";
import  blogSlice  from "./slices/blogSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        blog: blogSlice,
        // chat: chatSlice
        category:categorySlice
    }
})