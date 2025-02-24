import axios from "axios";
import { setProducts } from "../productsSlice";
import { setCategories } from "../categoriesSlice";


export const getProducts = async (dispatch) => {
    const response = await axios.get(import.meta.env.VITE_APP_API + '/products');
    dispatch(setProducts(response.data.products));
    dispatch(setCategories(response.data.categories));
}

export const createProduct = async (formData) => {
    const response = await axios.post(import.meta.env.VITE_APP_API + '/products/create-product', formData, {
        headers: { "Content-Type": "application/json" }
    });
    return response.data;
}

export const updateProduct = async (formData, idProduct) => {
    const response = await axios.put(import.meta.env.VITE_APP_API + '/products/update-product/' + idProduct, formData, {
        headers: { "Content-Type": "application/json" }
    });
    return response.data;
}

export const deleteProduct = async (idProduct) => {
    const response = await axios.delete(import.meta.env.VITE_APP_API + '/products/delete-product/' + idProduct);
    return response.data;
}

