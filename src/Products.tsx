import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';

interface Product {
  id: string;
  image: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
}

interface ProductsProps {
  searchQuery: string;
}

const MyCarouselComponent: React.FC = () => (
  <Carousel>
    <Carousel.Item>
      <Link to="/Nike">
        <img
          // src='https://cdn.findyourkicks.com/uploads/all/4571d3a3319822c8292340cb1fc8c21d.png'
          src='https://www.superkicks.in/cdn/shop/files/NIKE_DUNK-LOW-RETRO_2.jpg?v=1729582977&width=1500' 
          alt='Nike Deals'
          className='carousel-image'
          style={{ width: '100%', height: 'auto' }}
        />
      </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to="/Adidas">
        <img
          // src='https://cdn.findyourkicks.com/uploads/all/e757cd4e577e253a57c16a742911933a.png'
           src='https://www.superkicks.in/cdn/shop/files/PUMA_SPEEDCAT_BR_DESKTOP.jpg?v=1729582817&width=1500'
          alt='Adidas Banner'
          className='carousel-image'
          style={{ width: '100%', height: 'auto' }}
        />
      </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to="/NewBalance">
        <img
          src='https://www.superkicks.in/cdn/shop/files/NEWBALANCE_327_DESKTOP.jpg?v=1725956350&width=1780'
          alt='New Balance Deals'
          className='carousel-image'
          style={{ width: '100%', height: 'auto' }}
        />
      </Link> 
    </Carousel.Item>
  </Carousel>
);

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[2],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
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

const Products: React.FC<ProductsProps> = ({ searchQuery='' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/db.json`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/ProductDescription/${productId}`);
  };

  const filteredProducts = products.filter(product =>
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <MyCarouselComponent />
      <Divider sx={{ my: 4 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="purple"  sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          SHOP BY BRAND
        </Typography>
      </Divider>
      <Grid container spacing={2} justifyContent="center">
        {['Nike', 'Adidas', 'Sketchers', 'NewBalance'].map((brand, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Link to={`/${brand}`}>
              <img
                src={`https://www.findyourkicks.com/assets/imagess/shop-by-brand-${index + 1}.jpg`}
                alt={brand}
                style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
   
      <Divider sx={{ my: 4 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="purple" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          PRODUCTS
        </Typography>
      </Divider>

      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No products available
          </Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.model}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {product.brand}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {product.model}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong style={{ color: "rgb(101,157,218)" }}>₹{product.price}</strong>
                    {product.oldPrice && (
                      <Typography variant="caption" display="block">
                        M.R.P.: <del>₹{product.oldPrice}</del>
                      </Typography>
                    )}
                  </Typography>
                  <StyledButton variant="contained" onClick={() => handleProductClick(product.id)}>
                    View Details
                  </StyledButton>
                </CardContent>
              </ProductCard>
            </Grid>
          ))
        )}
      </Grid>
      
      <div style={{ marginTop: "50px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Products;

