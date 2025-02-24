import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        clearProducts: (state) => {
            state.products = null;
        }
    }
});

export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;