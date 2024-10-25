import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './Cartslice';
import { Card, CardMedia, CardContent, Typography, Button, Grid} from '@mui/material';
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
    margin: theme.spacing(2),
    borderRadius: 17,
    mt:2
}));

const ImageContainer = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(2.5),
}));

const ImageStyle = {
    borderRadius: '8px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: 370,
    objectFit: 'cover',
    mt:2
};

const CustomButton = styled(Button)(({ theme }) => ({
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
    const [cartBtnText, setCartBtnText] = useState<string>("Add to cart");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error:", error);
                toast.error("Could not load product data");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

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
            setCartBtnText("Added");
            toast.success("Item added to Cart");
            setTimeout(() => {
                setCartBtnText("Add more (+)");
            }, 1500);
        }
    };

    return (
        <div>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <ImageContainer>
                        <CardMedia
                            component="img"
                            alt={product.model}
                            image={product.image}
                            sx={ImageStyle}
                        />
                    </ImageContainer>
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
                                    <Typography sx={{ pl: 2 }}>
                                        <Typography style={{ fontWeight: "lighter", fontSize: "small" }}>
                                            M.R.P.: <del style={{ fontWeight: "lighter" }}>₹{product.oldPrice}</del>
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
                                onClick={handleAddToCart}
                                sx={{ mt: 2 }}
                            >
                                {cartBtnText}
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
