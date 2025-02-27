import axios from "axios";
import { setProducts } from "../productsSlice";
import { setCategories } from "../categoriesSlice";
axios.defaults.baseURL = import.meta.env.VITE_APP_API;

export const login = async (formData) => {
    const response = await axios.post('/login', formData);
    sessionStorage.setItem('token', response.data.token);
}

export const getProducts = async (dispatch) => {
    const response = await axios.get('/products', {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    });
    dispatch(setProducts(response.data.products));
    dispatch(setCategories(response.data.categories));
}

export const createProduct = async (formData) => {
    const response = await axios.post('/products/create-product', formData, {
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    return response.data;
}

export const updateProduct = async (formData, idProduct) => {
    const response = await axios.put('/products/update-product/' + idProduct, formData, {
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    return response.data;
}

export const deleteProduct = async (idProduct) => {
    const response = await axios.delete('/products/delete-product/' + idProduct, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    });
    return response.data;
}

