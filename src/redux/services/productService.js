import { setProducts } from "../productsSlice";
import { setCategories } from "../categoriesSlice";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_API;
axios.defaults.withCredentials = true;

export const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
}

export const users = async () => {
    await axios.get('/user');
}

export const login = async (formData) => {
    await axios.post('/login', formData);
}

export const getProducts = async (dispatch) => {
    const response = await axios.get('/products');
    dispatch(setProducts(response.data.products));
    dispatch(setCategories(response.data.categories));
}

export const createProduct = async (formData) => {
    const response = await axios.post('/products/create-product', formData);
    return response.data;
}

export const updateProduct = async (formData, idProduct) => {
    const response = await axios.put('/products/update-product/' + idProduct, formData);
    return response.data;
}

export const deleteProduct = async (idProduct) => {
    const response = await axios.delete('/products/delete-product/' + idProduct);
    return response.data;
}

