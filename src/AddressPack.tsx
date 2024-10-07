import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  margin: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '160px',
  marginLeft: theme.spacing(1),
  marginTop: "17px"
}));

interface Address {
  KicksID: string;
  id: string;
  FirstName: string;
  Mobile: string;
  Address: string;
  State: string;
}

const Addresspack: React.FC = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const kicksID = sessionStorage.getItem('KicksID');
  const navigate = useNavigate();
  const totalPrice = useSelector((state: any) => state.cart.totalPrice); 

  const handleAddress = () => {
    navigate('/Address');
  }

  const handleThisAddress = () => {
    if (totalPrice===0){
      toast.info("Please Add items to Cart")
    }
    else{
      navigate('/Payment');
    }

    
  }

  const handleDelete = async (id: string) => {
    try {
      // const response = await axios.delete(`http://localhost:8000/address/${id}`);
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/adddress/${id}`);
      console.log('Delete successful:', response.data);
      setAddress(prevAddresses => prevAddresses.filter(item => item.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  }

  const filteredProducts = address.filter((i) => i.KicksID === kicksID);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // const response = await axios.get<Address[]>('http://localhost:8000/address');
        const response = await axios.get<Address[]>(`${process.env.REACT_APP_BASE_URL}/address`);
        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching addresses', error);
      }
    };

    fetchAddresses();
  }, [kicksID]);

  return (
    <div >
      <Container>
        {kicksID === null ? (
          <Typography variant="h6" align="center" style={{ marginTop: '25px' }}>
            <b>PLEASE LOGIN TO VIEW YOUR SAVED ADDRESSES</b>
          </Typography>
        ) : (
          <>
            <Typography variant='h4'>
              <b>SAVED ADDRESSES</b>
            </Typography>
            <hr />
            <StyledButton
              style={{ width: '190px', marginTop: '15px' }}
              onClick={handleAddress}
              variant='contained'
              color='secondary'
            >
              <b style={{ paddingRight: '20px' }}>
                Add Address <AddCircleIcon style={{fontSize:"medium",marginBottom:"3px"}}/>
              </b>
            </StyledButton>
          </>
        )}
        <Grid container spacing={2}>
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" align="center" style={{ marginTop: '175px', marginLeft: '475px' }}>
              <b>No Address found.</b>
            </Typography>
          ) : (
            filteredProducts.map((x) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={x.id}>
                <ProductCard>
                  <CardContent>
                    <Typography variant='h6'>
                      <b>Address-{filteredProducts.indexOf(x) + 1} 
                        <IconButton style={{ marginLeft: "25px", marginBottom: "10px" }} onClick={() => handleDelete(x.id)}>
                          <DeleteSweepIcon />
                        </IconButton> 
                      </b>
                    </Typography>
                    <hr />
                    <Typography variant="body2"><b>KICKS ID:</b> {x.KicksID}</Typography>
                    <Typography variant="body2"><b>ID:</b> {x.id}</Typography>
                    <Typography variant="body2"><b>Name:</b> {x.FirstName}</Typography>
                    <Typography variant="body2"><b>Mobile Number:</b> {x.Mobile}</Typography>
                    <Typography variant="body2"><b>Address:</b> {x.Address}</Typography>
                    <Typography variant="body2"><b>State:</b> {x.State}</Typography>
                    <StyledButton
                      variant='outlined'
                      color='secondary'
                      onClick={handleThisAddress}
                    >
                      Continue with This Address
                    </StyledButton>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
}

export default Addresspack;
