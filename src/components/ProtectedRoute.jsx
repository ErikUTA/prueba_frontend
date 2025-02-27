import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './web/main/NavBar';
import { getProducts } from '../redux/services/productService';

const ProtectedRoutes = ({ routes }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    if(token == null) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

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