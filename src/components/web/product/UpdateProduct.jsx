import React, { useState } from "react"; 
import { TextField, Button, Checkbox, FormGroup, FormControlLabel, Container, Typography, Box } from "@mui/material";
import { getProducts, updateProduct } from '../../../redux/services/productService';
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const productCategories = useSelector((state) => state.product.product.categories);
    const product = useSelector((state) => state.product.product);
    const [disable, setDisable] = useState(false);
    const [form, setForm] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
        categories: productCategories
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (category) => {
        setForm((prevState) => ({
            ...prevState,
            categories: prevState.categories.some(c => c.id === category.id) ? 
                    prevState.categories.filter(c => c.id !== category.id) : 
                    [...prevState.categories, category]
        }));
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const loading = toast.loading("Enviando...");
        try { 
            setDisable(true);
            await updateProduct(form, product.id);
            toast.dismiss(loading);
            await getProducts(dispatch);
            toast.success("Se ha actualizado correctamente el producto.", {
                onDismiss: () => {
                    navigate('/home')
                },
                onAutoClose: () => {
                    navigate('/home')
                },
            });
        } catch (error) { 
            toast.dismiss(loading);
            toast.error("Error al actualizar el producto.");
            setDisable(false);
        } 
    };

    return (
        <Box component="main" sx={{ p: 3 }} className="home create-update"> 
            <Typography variant="h4" gutterBottom>Actualizar Producto </Typography>
            {
                product && (
                    <form onSubmit={handleSubmit}> 
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            label="Título" 
                            name="title" 
                            value={form.title}
                            onChange={handleChange} 
                            required 
                        /> 
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            label="Precio" 
                            name="price" 
                            type="number" 
                            value={form.price} 
                            onChange={handleChange} 
                            required 
                        /> 
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            label="Descripción" 
                            name="description" 
                            multiline 
                            rows={4} 
                            value={form.description}
                            onChange={handleChange} 
                            required 
                        /> 
                        <Typography variant="h6">Categorías</Typography> 
                        <FormGroup>
                            {
                                categories.map((category) => (
                                    <FormControlLabel 
                                        key={category.id} 
                                        control={
                                            <Checkbox 
                                                checked={form.categories.some(c => c.id === category.id)} 
                                                onChange={() => handleCheckboxChange(category)} 
                                            />
                                        } 
                                        label={category.name} 
                                    />
                                ))
                            } 
                        </FormGroup> 
                        <Button type="submit" variant="contained" color="primary" disabled={disable} fullWidth>Enviar</Button> 
                    </form> 
                )
            } 
            <Toaster />
        </Box>
    );
};