import { createSlice } from "@reduxjs/toolkit";
export const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:""
    },
    reducers:{
        setCategories: (state,data) => {
            state.category = data.payload;
        }
    }
})

export const {setCategories} = categorySlice.actions;
export default categorySlice.reducer;