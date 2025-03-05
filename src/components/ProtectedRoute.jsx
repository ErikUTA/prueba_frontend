import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getProducts, users } from '../redux/services/productService';
import NavBar from './web/main/NavBar';
import axios from '../utils/axios';

const ProtectedRoutes = ({ routes }) => {
    const [isAuthenticated, setiIsAuthenticated] = useState(null);

    const validate = async () => {
        try {
            await users(); 
            setiIsAuthenticated(true);
        } catch(error) {
            setiIsAuthenticated(false);
        }
    }

    useEffect(() => {
        validate();
    }, []);

    if(!isAuthenticated) {
        return <Navigate to="/login" />;
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