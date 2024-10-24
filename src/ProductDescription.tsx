import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './Cartslice';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import Offers from './Offers';

interface Product {
    id: string;
    image: string;
    model: string;
    brand: string;
    price: number;
    oldPrice?: number;
    description: string;
}

interface CartItem {
    id: string;
    image: string;
    model: string;
    price: number;
    quantity: number; 
}

const NikeCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 800,
    borderRadius: 17,
    margin: theme.spacing(2),
}));

const ProductContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2.5),
    textAlign: 'left',
    border: 'none',
    boxShadow: theme.shadows[1],
    borderRadius: 17,
    marginTop: 10,
    marginBottom: 20,
}));

const ImageStyle = {
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
};

const CustomButton = styled(Button)(() => ({
    margin: '0px',
    padding: '8px 12px',
    backgroundColor: 'purple',
    color: 'white',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        backgroundColor: '#AD68C1',
        transform: 'scale(1.03)',
    },
}));

const ProductDescription: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [cartbtn, setCartbtn] = useState<string>("Add to cart");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error("Network response is not good");
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    const handleAddToCart = () => {
        if (product) {
            const cartItem: CartItem = {
                id: product.id,
                image: product.image,
                model: product.model,
                price: product.price,
                quantity: 1,
            };
            dispatch(addToCart(cartItem));
            setCartbtn("Added");
            toast.success("Item added to Cart");
            setTimeout(() => {
                setCartbtn("Add more (+)");
            }, 1500);
        }
    };

    return (
        <div>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        alt={product.model}
                        image={product.image}
                        sx={ImageStyle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NikeCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom color='text.primary'>
                                <b>{product.model}</b> 
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ color: "red" }}>
                                {product.brand}
                            </Typography>
                            <Typography variant="body2" color="text.primary" sx={{ display: "flex", flexDirection: "row" }}>
                                <b style={{ color: "rgb(101,157,218)" }}>₹{product.price}</b>
                                {product.oldPrice && (
                                    <Typography>
                                        <Typography style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>
                                            M.R.P.:<del style={{ fontWeight: "lighter", paddingLeft: "5px", fontSize: "small" }}>
                                                ₹{product.oldPrice}
                                            </del>
                                        </Typography>
                                    </Typography>
                                )}
                            </Typography> 
                            <Offers />
                            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                                <strong>Description:</strong> {product.description}
                            </Typography>
                            <CustomButton
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                sx={{ mt: 2 }}
                            >
                                {cartbtn}
                            </CustomButton>
                        </CardContent>
                    </NikeCard>
                </Grid>
            </Grid>
            <Footer />
            <ToastContainer style={{ marginTop: "45px" }} />
        </div>
    );
};

export default ProductDescription;
