import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        products: productsReducer,
        categories: categoriesReducer,
    }
});