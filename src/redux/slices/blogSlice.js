import { createSlice } from "@reduxjs/toolkit";
export const blogSlice = createSlice({
    name:"blog",
    initialState:{
        blogs:[],
        singleBlog: ''
    },
    reducers:{
        setBlogs: (state,data) => {
            state.blogs = data.payload;
        },
        setSingleBlog:(state,data) => {
            state.singleBlog = data.payload;
        }
    }
}) 

export const { setBlogs,setSingleBlog } = blogSlice.actions;
export default blogSlice.reducer;