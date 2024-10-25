import React, {  useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import Footer from './Footer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useSelector } from 'react-redux';

interface FormValues {
  FirstName: string;
  Mobile: string;
  KicksID: string;
  Address: string;
  State: string;
}

const initialValues: FormValues = {
  FirstName: "",
  Mobile: "",
  KicksID: "",
  Address: "",
  State: "",
};

const validationSchema = Yup.object({
  FirstName: Yup.string().required("Name is required"),
  Mobile: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\d+$/, "Mobile must be a number")
    .min(10, "10 numbers required")
    .max(10, "Only 10 required"),
  KicksID: Yup.string().required("Enter Kicks ID"),
  Address: Yup.string().required("Address is required"),
  State: Yup.string().required("Enter state"),
});

const Address: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const kicksID = sessionStorage.getItem("KicksID") || '';
  const totalPrice = useSelector((state: any) => state.cart.totalPrice);

  const handleSignup = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/db.json`);
      const addresses = response.data.address;
      const userdata = addresses.find((i: any) => i.KicksID === kicksID);
  
      if (userdata) {
        // await axios.post(`${process.env.REACT_APP_BASE_URL}/db.json`, values);
        // console.log("Success:", response.data.posts);
        toast.success("Address added successfully");

        if (totalPrice !== 0) {
          setTimeout(() => {
            navigate('/Payment');
          }, 600);
        } else {
          navigate('/Products');
        }
      } else {
        toast.error("Kicks ID is not matching");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        {!kicksID ? (
          <Typography variant="h6" align="center" style={{ marginTop: '25px', height: "50vh" }}>
            <b>PLEASE LOGIN TO ADD ADDRESS</b>
          </Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
              <Typography variant='h4' gutterBottom alignItems='center' style={{ textDecoration: "underline" }}>
                <b><LocalShippingIcon style={{ fontSize: "42px", marginRight: "10px" }} /> SHIPPING DETAILS</b>
              </Typography>

              <Box sx={{ width: '100%', mt: 3 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSignup}
                >
                  {({ handleChange }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            name="FirstName"
                            as={TextField}
                            label="Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            helperText={<ErrorMessage name="FirstName" />}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="Mobile"
                            as={TextField}
                            label="Mobile Number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            helperText={<ErrorMessage name="Mobile" />}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="KicksID"
                            as={TextField}
                            label="Kicks ID"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            helperText={<ErrorMessage name="KicksID" />}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="Address"
                            as={TextField}
                            label="Address with Pincode"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            helperText={<ErrorMessage name="Address" />}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="State"
                            as={TextField}
                            label="Town & State"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            helperText={<ErrorMessage name="State" />}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              disabled={isSubmitting}
                            >
                              {totalPrice === 0 ? "Add Address" : "Proceed to Payment"}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Address;



// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
// import Footer from './Footer';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import { useSelector } from 'react-redux';

// interface FormValues {
//   FirstName: string;
//   Mobile: string;
//   KicksID: string;
//   Address: string;
//   State: string;
// }

// const initialValues: FormValues = {
//   FirstName: "",
//   Mobile: "",
//   KicksID: "",
//   Address: "",
//   State: "",
// };

// const validationSchema = Yup.object({
//   FirstName: Yup.string().required("Name is required"),
//   Mobile: Yup.string()
//     .required("Mobile Number is required")
//     .matches(/^\d+$/, "Mobile must be a number")
//     .min(10, "10 numbers required")
//     .max(10, "Only 10 required"),
//   KicksID: Yup.string().required("Enter Kicks ID"),
//   Address: Yup.string().required("Address is required"),
//   State: Yup.string().required("Enter state"),
// });

// const Address: React.FC = () => {
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const kicksID = sessionStorage.getItem("KicksID") || '';
//   const totalPrice = useSelector((state: any) => state.cart.totalPrice);

//   const handleSignup = async (values: FormValues) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/db.json`);
//       const addresses = response.data.address;
//       const userdata = addresses.find((i: any) => i.KicksID === kicksID);
  
//       if (userdata) {
//         // await axios.post(`${process.env.REACT_APP_BASE_URL}/db.json`, values);
//         // console.log("Success:", response.data.posts);
//         toast.success("Address added successfully");

//         if (totalPrice !== 0) {
//           setTimeout(() => {
//             navigate('/Payment');
//           }, 600);
//         } else {
//           navigate('/Products');
//         }
//       } else {
//         toast.error("Kicks ID is not matching");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Container maxWidth="sm">
//         {!kicksID ? (
//           <Typography variant="h6" align="center" style={{ marginTop: '25px', height: "50vh" }}>
//             <b>PLEASE LOGIN TO ADD ADDRESS</b>
//           </Typography>
//         ) : (
//           <>
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
//               <Typography variant='h4' gutterBottom alignItems='center' style={{ textDecoration: "underline" }}>
//                 <b><LocalShippingIcon style={{ fontSize: "42px", marginRight: "10px" }} /> SHIPPING DETAILS</b>
//               </Typography>

//               <Box sx={{ width: '100%', mt: 3 }}>
//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSignup}
//                 >
//                   {({ handleChange }) => (
//                     <Form>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <Field
//                             name="FirstName"
//                             as={TextField}
//                             label="Name"
//                             fullWidth
//                             variant="outlined"
//                             margin="normal"
//                             helperText={<ErrorMessage name="FirstName" />}
//                             onChange={handleChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Field
//                             name="Mobile"
//                             as={TextField}
//                             label="Mobile Number"
//                             fullWidth
//                             variant="outlined"
//                             margin="normal"
//                             helperText={<ErrorMessage name="Mobile" />}
//                             onChange={handleChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Field
//                             name="KicksID"
//                             as={TextField}
//                             label="Kicks ID"
//                             fullWidth
//                             variant="outlined"
//                             margin="normal"
//                             helperText={<ErrorMessage name="KicksID" />}
//                             onChange={handleChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Field
//                             name="Address"
//                             as={TextField}
//                             label="Address with Pincode"
//                             fullWidth
//                             variant="outlined"
//                             margin="normal"
//                             helperText={<ErrorMessage name="Address" />}
//                             onChange={handleChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Field
//                             name="State"
//                             as={TextField}
//                             label="Town & State"
//                             fullWidth
//                             variant="outlined"
//                             margin="normal"
//                             helperText={<ErrorMessage name="State" />}
//                             onChange={handleChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="secondary"
//                               disabled={isSubmitting}
//                             >
//                               {totalPrice === 0 ? "Add Address" : "Proceed to Payment"}
//                             </Button>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </Form>
//                   )}
//                 </Formik>
//               </Box>
//             </Box>
//           </>
//         )}
//       </Container>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// }

// export default Address;
