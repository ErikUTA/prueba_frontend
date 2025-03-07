import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './web/main/NavBar';
import { authUser, getProducts } from '../redux/services/productService';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';

const ProtectedRoutes = ({ routes }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    useEffect(() => {
        const validate = async () => {        
            try {
                await authUser();
                setIsAuthenticated(true);
                getProducts(dispatch);
            } catch(error) {
                setIsAuthenticated(false);
            }
        }
        validate();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className='center circular'>
                <CircularProgress size="3rem" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <NavBar />
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route 
                            key={index}
                            path={route.path}
                            element={route.element}
                        />                
                    ))
                }
            </Routes>
        </>
    );
};

export default ProtectedRoutes;