import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Footer from './Footer';
import { PiSneakerFill } from "react-icons/pi";

const NikeCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[1],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  }
}));

interface Product {
  id: string;
  image: string;
  model: string;
  brand: string;
  price: number;
  oldPrice?: number;
}

interface NikeProps {
  searchQuery: string;
}

const Sketchers: React.FC<NikeProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get<Product[]>("http://localhost:8000/sketchers");
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/db.json`);
        const productsData = response.data.products; 
        const sketchersProducts =productsData.filter((product: { brand: string; }) => product.brand.toLowerCase() === 'yeezys');
        setProducts(sketchersProducts);
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
    <div >
       <Typography variant='h4'  >
              <b><PiSneakerFill style={{fontSize:"45px",marginLeft:"4px",marginRight:"3px"}} />
              YEEZYS SNEAKERS</b>
            </Typography>
      <hr></hr>
      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.length === 0 ? (
          <Typography>No products available</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <NikeCard>
                <CardMedia
                  component="img"
                  alt={product.model}
                  height="200"
                  image={product.image}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Typography variant="h6">
                    <b>{product.model}</b>
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
                  <Button variant="contained" color="secondary" sx={{mt:2}} onClick={() => handleProductClick(product.id)}>
                    View Details
                  </Button>
                </CardContent>
              </NikeCard>
            </Grid>
          ))
        )}
      </Grid>
      <Footer/>
    </div>
  );
};

export default Sketchers;
