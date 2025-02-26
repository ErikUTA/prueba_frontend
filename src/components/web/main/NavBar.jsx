import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                {
                    location.pathname !== "/" && 
                    <Button variant='contained' onClick={() => navigate('/')}>Regresar</Button>
                }
                <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    Productos
                </Typography>
                {
                    location.pathname !== "/create" &&
                    <Button variant='contained' onClick={() => navigate('/create')}>Agregar producto</Button>
                }
            </Toolbar>
        </AppBar>
    )
}