import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  KicksID: string;
  Password: string;
}

const initialValues: FormValues = {
  KicksID: "",
  Password: "",
};


const validationSchema = Yup.object({
  KicksID: Yup.string().required('Required'),
  Password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
});

const Forms: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      // const response = await axios.get("http://localhost:8000/posts");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
      const users = response.data;
      const user = users.find((user: { KicksID: string;  password: string }) => 
        user.KicksID === values.KicksID && 
        user.password === values.Password 
      );

      if (user) {
        sessionStorage.setItem("KicksID", user.KicksID);
        toast.success('Successfully Logged In!');
        navigate("/Products");
      } else {
        toast.error("Invalid Details");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Box
              sx={{
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'background.paper',
                width: '100%',
                maxWidth: 400,
                margin: 'auto',
                mt: 6,
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                <b>Sign In</b>
              </Typography>
              <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                  <Field
                    name="KicksID"
                    as={TextField}
                    label="Kicks ID"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="KicksID" />}
                  
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="Password"
                    type="password"
                    as={TextField}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="Password" />}
                    
                  />
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link to='/Signup'>Signup</Link>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} mb={2} marginTop={2} textAlign="center">
                <DialogActions>
                <Button type="submit" variant="contained" color="primary" style={{ width: '190px',marginRight:"20px" }} disabled={isSubmitting}>
                  Sign In
                </Button>
                </DialogActions>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Forms;
