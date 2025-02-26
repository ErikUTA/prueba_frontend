import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../../redux/productSlice';
import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../../redux/services/productService';
import { toast, Toaster } from "sonner";
import Swal from 'sweetalert2';

function Product({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

    const setProductData = (url) => {
        dispatch(setProduct(data));
        navigate(url);
    }

    const showModal = () => {
        Swal.fire({
            title: "Seguro que quieres eliminar el producto?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(toast.loading("Eliminando..."));
                removeProduct();
            }
        });
    }


    const removeProduct = async () => {
        try {
            await deleteProduct(data.id);
            toast.dismiss(loading);
            toast.success("Se ha eliminado el producto");
            getProducts(dispatch);
        } catch(error) {
            toast.dismiss(loading);
            toast.success("Error al eliminar el producto");
        }
    }

    return (
        <Card className="product elements-center" xs={12} sm={8} md={4}>
            <Typography variant="h4" gutterBottom>{data.title}</Typography>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button onClick={() => setProductData('/about')}>Ver</Button>
                <Button onClick={() => setProductData('/update')}>Editar</Button>
                <Button onClick={() => showModal()}>Eliminar</Button>
            </ButtonGroup>
            <Toaster />
        </Card>
    )
}

export default Product;