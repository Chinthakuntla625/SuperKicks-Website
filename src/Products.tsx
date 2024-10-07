import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Products.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid, Divider, Button, } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import './css/index.css';


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

const MyCarouselComponent: React.FC = () => {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
      <Link to="/Nike"><img
          src='https://cdn.findyourkicks.com/uploads/all/4571d3a3319822c8292340cb1fc8c21d.png'
          alt='iPhone 15 Special Deals'
          className='carousel-image'
        />
      </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to="/Adidas"><img
          src='https://cdn.findyourkicks.com/uploads/all/e757cd4e577e253a57c16a742911933a.png'
          alt='Artstation Banner'
          className='carousel-image'
        />
      </Link>
      </Carousel.Item>
      <Carousel.Item>
       <Link to="/NewBalance"> <img
          src='https://www.superkicks.in/cdn/shop/files/NEWBALANCE_327_DESKTOP.jpg?v=1725956350&width=1780'
          alt='iPhone 15 Pre-Orders'
          className='carousel-image'
        /></Link>
      </Carousel.Item>
    </Carousel>
  );
};


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
  // borderRadius: '20px',

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

const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          console.log("process.env.REACT_APP_PRODUCTS_URL",process.env.REACT_APP_PRODUCTS_URL)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.log("Error:", error);
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
      <Divider style={{marginBottom:"13px"}}>
        <Typography variant="h4"  align="center"  sx={{ mt: 4, mb: 4, fontWeight: 'bold' ,color:"purple"}}>
        SHOP BY BRAND
      </Typography>
      </Divider>
      <Grid container sx={{display:"flex",flexDirection:"row",gap:18}}>
        <Grid item xs={2}>
        <Link to='/Nike'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-3.jpg' alt='nike'
         style={{width:"400px",height:"200px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
        </Grid>
        <Grid item xs={2}>
        <Link to='/Adidas'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-1.jpg' alt='adidas' 
        style={{width:"400px",height:"200px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
        </Grid>
        <Grid item xs={2}>
        <Link to='/Sketchers'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-2.jpg' alt='Yeezy'
         style={{width:"400px",height:"200px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
         </Grid>
         <Grid item xs={2}>
        <Link to='/NewBalance'><img src='https://www.findyourkicks.com/assets/imagess/new-balance.jpeg' alt='Newbalance'
         style={{width:"400px",height:"200px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
         </Grid>
      </Grid>
   
      <Divider style={{marginBottom:"10px"}}>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 4, fontWeight: 'bold' ,color:"purple"}}>
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
            <Grid item xs={12} sm={6} md={5} lg={3} key={product.id}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.model}
                />
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {product.brand}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {product.model}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{display:"flex",flexDirection:"row"}}>
                    <b style={{ color: "rgb(101,157,218)" }}>₹{product.price}</b>
        
                    {product.oldPrice && (
                      <Typography>
                        <Typography style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>M.R.P.:<del style={{ fontWeight: "lighter", paddingLeft: "5px", fontSize: "small" }}>
                        ₹{product.oldPrice}
                      </del></Typography>
                      </Typography>
                          
                    )}
                  </Typography>
                  
                  <StyledButton variant="contained" color="secondary" size='small' onClick={() => handleProductClick(product.id)}>
                    View Details
                  </StyledButton>
                </CardContent>
              </ProductCard>
            </Grid>
          ))
        )}
      </Grid>
      
   <div style={{marginTop:"50px"}}>
   <Footer />
   </div>
    
    </div>
  );
};

export default Products;



