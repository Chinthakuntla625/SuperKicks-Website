import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Footer from './Footer';
import { SiNike } from "react-icons/si";

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

const Nike: React.FC<NikeProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get<Product[]>("http://localhost:8000/nike");
        const response = await axios.get<Product[]>(`${process.env.REACT_APP_BASE_URL}/nike`);
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
    <div >
      <Typography variant='h4'  >
              <b><SiNike style={{margin:"12px"}}/>
              NIKE SNEAKERS</b>
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
                  height="185"
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

export default Nike;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import Footer from './Footer';

// const NikeCard = styled(Card)(({ theme }) => ({
//   maxWidth: 245,
//   margin: theme.spacing(0.5),
//   boxShadow: theme.shadows[1],
//   transition: 'transform 0.2s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.03)',
//   }
// }));

// interface Product {
//   id: string;
//   image: string;
//   model: string;
//   brand: string;
//   price: number;
//   oldPrice?: number;
// }

// interface NikeProps {
//   searchQuery: string;
// }

// const Nike: React.FC<NikeProps> = ({ searchQuery }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get<Product[]>("http://localhost:8000/nike");
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       } 
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId: string) => {
//     navigate(`/ProductDescription/${productId}`);
//   };

//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().startsWith(searchQuery.toLowerCase())
//   );

//   return (
//     <div className='Products'>
//       <img src='https://media.licdn.com/dms/image/C4E12AQEbmprWTquG4w/article-cover_image-shrink_600_2000/0/1624505949056?e=2147483647&v=beta&t=uDDK-uPblwxBo1CJosZ_UrS5X0Lfqe2WMYNnh2GfCXw' alt='nike'
//       style={{width:"1220px", height:"200px"}}>
//       </img>
//       <Typography variant="h4" align="center"  gutterBottom sx={{mb:3}}>
//         <b>Nike Sneakers</b>
//       </Typography>
//       <Grid container spacing={4} justifyContent="center">
//         {filteredProducts.length === 0 ? (
//           <Typography>No products available</Typography>
//         ) : (
//           filteredProducts.map((product) => (
//             <Grid item xs={10} sm={6} md={4} lg={3} key={product.id}>
//               <NikeCard>
//                 <CardMedia
//                   component="img"
//                   alt={product.model}
//                   height="140"
//                   image={product.image}
//                 />
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     {product.brand}
//                   </Typography>
//                   <Typography variant="h6">
//                     <b>{product.model}</b>
//                   </Typography>
//                   <Typography variant="body2" color="text.primary">
//                     <b style={{ color: "rgb(101,157,218)" }}>{product.price}$</b>
//                     {product.oldPrice && (
//                       <del style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>
//                         {product.oldPrice}$
//                       </del>
//                     )}
//                   </Typography>
//                   <Button variant="contained" color="secondary" sx={{borderRadius:20}} onClick={() => handleProductClick(product.id)}>
//                     View Details
//                   </Button>
//                 </CardContent>
//               </NikeCard>
//             </Grid>
//           ))
//         )}
//       </Grid>
//       <Footer/>
//     </div>
//   );
// };

// export default Nike;