import axios from "axios";
import { setProducts } from "../productsSlice";
import { setCategories } from "../categoriesSlice";
import { setLogin } from "../authSlice";

export const login = async (formData, dispatch) => {
    const response = await axios.post(import.meta.env.VITE_APP_API + '/login', formData);
    dispatch(setLogin(response.data.token));
}

export const getProducts = async (dispatch, token) => {
    const response = await axios.get(import.meta.env.VITE_APP_API + '/products', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch(setProducts(response.data.products));
    dispatch(setCategories(response.data.categories));
}

export const createProduct = async (formData, token) => {
    const response = await axios.post(import.meta.env.VITE_APP_API + '/products/create-product', formData, {
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const updateProduct = async (formData, idProduct, token) => {
    const response = await axios.put(import.meta.env.VITE_APP_API + '/products/update-product/' + idProduct, formData, {
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteProduct = async (idProduct, token) => {
    const response = await axios.delete(import.meta.env.VITE_APP_API + '/products/delete-product/' + idProduct, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

