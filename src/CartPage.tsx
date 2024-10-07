import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addItem, removeItem, clearCart } from './Cartslice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillPlusCircle } from 'react-icons/ai';
import { HiMinusCircle } from 'react-icons/hi';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardContent, Typography, Grid, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface CartItem {
  id: string;
  image: string;
  model: string;
  price: number;
  quantity: number; 
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

const CartPage: React.FC = () => {
  const items = useSelector((state: { cart: CartState }) => state.cart.items);
  const totalPrice = useSelector((state: { cart: CartState }) => state.cart.totalPrice);
  const count = useSelector((state: { cart: CartState }) => state.cart.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item successfully removed");
  };

  const handleAddItem = (id: string) => {
    dispatch(addItem(id));
  };

  const handleDelItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handlePlaceOrder = async () => {
    try {
      const kicksID = sessionStorage.getItem("KicksID");

      if (!kicksID) {
        alert("You don't have an account, please login to continue");
        toast.error("Please Login to continue");
        navigate('/Forms');
        return;
      }

      const order = {
        items,
        totalPrice,
        count,
        kicksID,
        date: new Date().toISOString(),
      };

      // await axios.post('http://localhost:8000/Orderhistory', order);
       await axios.post(`${process.env.REACT_APP_BASE_URL}/Orderhistory`,order);

      // const response = await axios.get('http://localhost:8000/address');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/address`);
      const userdata = response.data.find((i: any) => i.KicksID === kicksID);

      if (userdata) {
        navigate('/Addresspack');
      } else {
        navigate('/Addresspack');
      }

    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  if (items.length === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={3}>
        <img src='https://go.picsnippets.com/hosted/images/ac/97a7e657b64475a09d370eb77d176a/cart_gif.gif' alt='Add items to continue'
        style={{height:"400px"}}/>
        <Typography variant="h6" mt={0}>Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <div>
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="secondary"><b>CHECKOUT </b>
              </Typography>
              
              {/* <Divider sx={{ my: 2 }} /> */}
              <hr></hr>
              <Typography variant="body1" ><b>Total Items: {count}</b>
              <br></br>
              <Button  onClick={()=>dispatch(clearCart())} style={{cursor:"pointer",color:"red",}} size='small'>Empty Cart<DeleteForeverIcon style={{fontSize:'15px'}} /></Button>
              </Typography>
              <Divider sx={{ my: 2 }} />
              {items.map((item) => (
                <Box key={item.id} mb={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Link to={`/ProductDescription/${item.id}`}>
                        <img src={item.image} alt={item.model} style={{ height: 110, width: 100 }} />
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1"><b>Quantity: </b>{item.quantity}</Typography>
                      <IconButton size='small'><AiFillPlusCircle onClick={() => handleAddItem(item.id)} style={{ cursor: 'pointer' }} /></IconButton>
                      {item.quantity === 1 ?(
                        <IconButton size='small' disabled><HiMinusCircle onClick={() => handleDelItem(item.id)} style={{ cursor: 'pointer' }} /></IconButton>
                      ):
                      (
                        <IconButton size='small'><HiMinusCircle onClick={() => handleDelItem(item.id)} style={{ cursor: 'pointer' }} /></IconButton>
                      )
                    }
                      
                      <Typography variant="body1"><b>Name: </b>{item.model}</Typography>
                      <Typography variant="body1"><b>Price: </b>₹{item.price}</Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="secondary" onClick={() => handleRemoveFromCart(item.id)}> Remove from cart 
                        <DeleteIcon style={{fontSize:"19px"}}/> </Button>
                     </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="secondary"><b>Estimated Amount</b></Typography>
              {/* <Divider sx={{ my: 2 }} /> */}
              <hr></hr>
              <Typography variant="body1" display="flex" justifyContent="space-between"><b>Sub total:</b> ${totalPrice.toFixed(2)}</Typography>
              <Typography variant="body1" display="flex" justifyContent="space-between"><b>GST:</b> ₹0</Typography>
              <Typography variant="body1" display="flex" justifyContent="space-between"><b>Delivery charges:</b> <del>₹69</del> <span style={{ color: "deepgreen" }}>FREE</span></Typography>
              <Typography variant="body1" display="flex" justifyContent="space-between"><b>Platform fees:</b> <del>₹100</del> <span style={{ color: "deepgreen" }}>FREE</span></Typography>
              {/* <Divider sx={{ my: 2 }} /> */}
              <hr></hr>
              <Typography variant="h6" color="secondary" display="flex" justifyContent="space-between"><b>Total Amount:</b> ₹{totalPrice.toFixed(2)}</Typography>
              <Box mt={2}>
                <Button variant="contained" color="secondary" fullWidth onClick={handlePlaceOrder}>
                  CheckOut
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer style={{marginTop:"45px"}}/>
      
    </Box>
    <Footer />
    </div>
  );
};

export default CartPage;
