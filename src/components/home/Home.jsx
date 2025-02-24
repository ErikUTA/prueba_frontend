import React from 'react'
import { Box, Card, CircularProgress, Grid2, Toolbar } from '@mui/material';
import Product from '../product/Product';
import { useSelector } from "react-redux";

export default function Home() {
    const products = useSelector((state) => state.products.products);

    return (
        <Box component="main" sx={{ p: 3 }} className="home">
            <Grid2 container spacing={2} className="elements-center">
                {
                    products.length > 0 ? products.map((product) => (
                        <Product key={product.id} data={product} />
                    )) : (<div className='center circular'><CircularProgress size="3rem" /></div>)
                }
            </Grid2>
        </Box>
    )
}
