import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/services/productService";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast, Toaster } from "sonner";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: null,
        password: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
            const loading = toast.loading("Cargando...");
            try { 
                await login(formData, dispatch);
                toast.dismiss(loading);
                navigate('/home');
            } catch (error) { 
                toast.dismiss(loading);
                toast.error("Credenciales incorrectas");
            } 
    }

    return (
        <Box component="main" sx={{ p: 3 }} className="home create-update">
            <Typography variant="h4" gutterBottom>Login</Typography> 
            <form onSubmit={handleSubmit}> 
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Correo electrónico" 
                    type="email"
                    name="email" 
                    onChange={handleChange} 
                    required 
                /> 
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Contraseña" 
                    name="password" 
                    type="password" 
                    onChange={handleChange} 
                    required 
                /> 
                <Button type="submit" variant="contained" color="primary" fullWidth>Iniciar sesión</Button> 
            </form> 
            <Toaster />
        </Box>
    )
}