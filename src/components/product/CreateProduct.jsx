import React, { useState } from "react"; 
import { TextField, Button, Checkbox, FormGroup, FormControlLabel, Typography, Box, CircularProgress } from "@mui/material";
import { createProduct, getProducts } from '../../redux/services/productService';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const [formData, setFormData] = useState({ 
        title: "", 
        price: "", 
        description: "", 
        categories: [] 
    });

    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value }); 
    };

    const handleCheckboxChange = (category) => { 
        setFormData((prev) => ({ 
            ...prev, 
            categories: prev.categories.includes(category) 
            ? prev.categories.filter((c) => c !== category) 
            : [...prev.categories, category], 
        })); 
    };
 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const loading = toast.loading("Enviando...");
        try { 
            await createProduct(formData);
            toast.dismiss(loading);
            getProducts(dispatch);
            toast.success("Se ha creado correctamente el producto.", {
                onDismiss: () => {
                    navigate('/')
                },
                onAutoClose: () => {
                    navigate('/')
                },
            });
        } catch (error) { 
            toast.dismiss(loading);
            toast.error("Error al crear el producto.");
        } 
    };

    return (
        <Box component="main" sx={{ p: 3 }} className="home create-update">
            <Typography variant="h4" gutterBottom> Crear Producto </Typography> 
            <form onSubmit={handleSubmit}> 
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Título" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                /> 
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Precio" 
                    name="price" 
                    type="number" 
                    value={formData.price} 
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
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                /> 
                <Typography variant="h6">Categorías</Typography> 
                <FormGroup>
                    {
                        categories.length > 0 ? categories.map((category) => (
                            <FormControlLabel 
                                key={category.id} 
                                control={
                                    <Checkbox  
                                        onChange={() => handleCheckboxChange(category.id)} 
                                    />
                                } 
                                label={category.name} 
                            />
                        )) : (<div className='center circular'><CircularProgress size="3rem" /></div>)
                    } 
                </FormGroup> 
                <Button type="submit" variant="contained" color="primary" fullWidth>Enviar</Button> 
            </form> 
            <Toaster />
        </Box>
    );
};