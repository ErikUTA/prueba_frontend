import { Box, Button, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Details() {
    const product = useSelector((state) => state.product.product);

    return (
        <Box component="main" sx={{ p: 3 }} className="home center">
            <Card className="product elements-center">
                <Typography variant="h4" gutterBottom>{product.title}</Typography>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <p>{product.categories && product.categories.map(category => category.name)}</p>
            </Card>
        </Box>
    )
}