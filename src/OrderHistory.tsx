
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { Card, CardContent, Typography, Grid, Container, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Item {
  model: string;
  price: number;
  quantity: number;
}

interface Order {
  date: string;
  totalPrice: number;
  items: Item[];
  kicksID: string;
}

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  margin: theme.spacing(2),
}));

const Styledbtn=styled(Button)(()=>({
  marginBottom: "16px", width: "200px",marginLeft:"4px" 
  , marginTop: "16px",backgroundColor:"#f50057",color:"white",
}))

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const kicksID = sessionStorage.getItem("KicksID");


  // const handleDownload=()=>{
  //   window.print();
  // }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // const response = await axios.get<Order[]>('http://localhost:8000/Orderhistory');
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/db.json`);
        if (kicksID) {
          const userOrders = response.data.Orderhistory.filter((order: { kicksID: string; }) => order.kicksID === kicksID);
          setOrders(userOrders);
        }
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [kicksID]);

  if (loading) return <CircularProgress />;

  return (
    <div>
    <Container>
      <div className="order-history">
        {kicksID === null ? (
          <Typography variant="h6" align="center" style={{ marginTop: "25px",height:"50vh" }}>
            <b>PLEASE LOGIN TO VIEW YOUR ORDER HISTORY</b>
          </Typography>
        ) : (
          <>
            <Typography variant='h4'  >
              <b>ORDER HISTORY</b>
            </Typography>
            <hr></hr>
            <Styledbtn variant='contained' color='secondary' >
                <strong>USER NAME:</strong> <b style={{ color: "white" }}> {kicksID}</b>
            </Styledbtn>
          </>
          
        )}
       
        {error && (
          <Typography color="error" align="center" style={{ marginBottom: "16px" }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          {orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCard>
                <CardContent>
                  <Typography variant="h6">
                    <b>ORDER-{index + 1}</b>
                  </Typography>
                  <hr></hr>
                  <Typography variant="body2">
                    <b>Kicks ID:</b> {kicksID}
                  </Typography>
                  
                  <Typography variant="body2">
                    <b>Date:</b> {new Date(order.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <b>Total Price:</b> ₹{order.totalPrice.toFixed(2)}
                  </Typography>
                 
                  <hr></hr>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">
                          <b>Item:</b> {item.model} - <b> ₹{item.price}</b>
                        </Typography>
                        <Typography variant="body2">
                          <b>Quantity:</b> {item.quantity}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                {/* <Button variant='outlined' color='success' onClick={()=>handleDownload()}>Download</Button> */}
                </CardContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
     <Footer/>
     </div>
  );
};

export default OrderHistory;




