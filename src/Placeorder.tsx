import React from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Button,Typography } from '@mui/material';

const Placeorder: React.FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/Products');
  };

  const handleOrderhistory = () => {
    navigate('/OrderHistory');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      localStorage.clear();
      navigate('/Forms');
    }
  };

  return (
    <div>
    <div style={{display: "flex",
      flexDirection: "column",
      justifyContent:" center",
      alignItems: "center",
      height: "50vh",
      textAlign: "center" }}>

      <img src="https://th.bing.com/th/id/OIP.6_XGFhBTDIPIibj9Tvk7XQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt='Successful'
      style={{maxWidth:"130px",height:"130px"}} />
      <Typography><b>Your order was placed successfully!!</b></Typography>
      <p>We have sent you an email with the order details</p>
      <div style={{padding:"6px",display:"flex",gap:"10px"}}>
      <Button variant="contained"  style={{padding:"6px",borderRadius:"10px",backgroundColor:"#72C94F"}}  onClick={handleHome}>Go to Home</Button>
      <Button variant="contained"  style={{padding:"6px",borderRadius:"10px",backgroundColor:"#72C94F"}}  onClick={handleOrderhistory}>Order History</Button>
      <Button variant="contained"  style={{padding:"6px",borderRadius:"10px",backgroundColor:"#72C94F"}} onClick={handleLogout}>Logout</Button>
      </div>
    </div>
     <Footer />
    </div>
  );
};

export default Placeorder;



