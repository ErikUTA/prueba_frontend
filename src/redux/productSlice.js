import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {
        title: "",
        price: 0,
        description: "",
        categories: []
    }
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProductField: (state, action) => {
            const { field, value } = action.payload;
            state.product[field] = value;
        },
        setProduct: (state, action) => {
            state.product = action.payload
        }   
    }
});

export const { updateProductField, setProduct } = productSlice.actions;
export default productSlice.reducer;