import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../../redux/services/productService';
import { toast, Toaster } from 'sonner';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logoutFunction = async () => {
        const loading = toast.loading("Cerrando sesión...");
        await logout();
        toast.dismiss(loading);
        localStorage.removeItem('login');
        navigate('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {
                    location.pathname !== "/home" && 
                    <Button variant='contained' onClick={() => navigate('/home')}>Regresar</Button>
                }
                <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    Productos
                </Typography>
                {
                    location.pathname !== "/create" &&
                    <Button variant='contained' onClick={() => navigate('/create')}>Agregar producto</Button>
                }
                <Button variant='contained' onClick={() => logoutFunction()}>Cerrar sesión</Button>
            </Toolbar>
            <Toaster />
        </AppBar>
    )
}