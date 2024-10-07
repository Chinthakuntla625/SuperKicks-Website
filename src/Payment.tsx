import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './Cartslice';
import { MdOutlinePayment } from "react-icons/md";
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import Footer from './Footer';

interface PaymentValues {
  Name: string;
  cardnumber: string;
  expiry: string;
  cvv: string;
}

const initialValues: PaymentValues = {
  Name: "",
  cardnumber: "",
  expiry: "",
  cvv: "",
};

const validationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  cardnumber: Yup.string().required("Card Number is required")
    .matches(/^\d+$/, "Card Number must be a number")
    .min(13, "Card Number is too short")
    .max(19, "Card Number is too long"),
  expiry: Yup.date().required("Expiry date is required"),
  cvv: Yup.string().required("CVV is required")
    .matches(/^\d+$/, "CVV must be a number")
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits"),
});

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState(false);
  const totalPrice = useSelector((state: any) => state.cart.totalPrice); 
  const dispatch = useDispatch();
  const kicksID=sessionStorage.getItem("KicksID") || '';

  const handlePrice = () => {
    if (totalPrice !== 0) {
      navigate('/Placeorder');
      dispatch(clearCart());
    } else {
      navigate('/Products');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (save) {
        const message = "Changes may not be saved on reload";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [save]);

  const handleSignup = async (values: PaymentValues) => {
    try {
      console.log("Success:", values);
      setSave(false);
      handlePrice();
    } catch (error) {
      console.log("Error:", error);
      console.log("Payment Values:", values);
    }
  };

  return (
    <div>
    <Container  maxWidth="sm">

    {!kicksID?(
        <Typography variant="h6" align="center" style={{ marginTop: '25px', height:"50vh" }}>
            <b>PLEASE LOGIN FOR PAYMENT</b>
          </Typography>
          ):(
            <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          <MdOutlinePayment style={{ paddingRight: "7px", fontSize: "40px" }} />
          <b>PAYMENT DETAILS</b>
        </Typography>
        <Box sx={{ width: '100%', mt: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
            validate={() => setSave(true)}
          >
            {({ handleChange }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="Name"
                      as={TextField}
                      label="Name"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      helperText={<ErrorMessage name="Name" />}
               
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="cardnumber"
                      as={TextField}
                      label="Card Number"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      placeholder="1234 5678 9012 3456"
                      helperText={<ErrorMessage name="cardnumber"/> }
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="expiry"
                      as={TextField}
                      label="Expiry Date"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      placeholder="MM/YY"
                      helperText={<ErrorMessage name="expiry" />}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="cvv"
                      as={TextField}
                      label="CVV/CVC"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      placeholder="123"
                      type="password"
                      helperText={<ErrorMessage name="cvv" />}
                      
                      onChange={handleChange}></Field>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ fontSize: '1.25rem' }}
                  >
                    <b>Pay:</b>
                    <b>{totalPrice}/-</b>
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
</>
)}





      
    </Container>
     <Footer />
     </div>
  );
}

export default Payment;
