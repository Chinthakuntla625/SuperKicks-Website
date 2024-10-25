import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

interface SignupValues {
  email: string;
  password: string;
  KicksID: string;
}

const initialValues: SignupValues = {
  email: "",
  password: "",
  KicksID: "",
};



const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
  KicksID: Yup.string().required('Required'),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();
 
  const [save, setSave] = useState<boolean>(false);

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

  const handleSubmit = async (values: SignupValues, actions: FormikHelpers<SignupValues>) => {
    try {
      // const response = await axios.post("http://localhost:8000/posts", values);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/db.json`,values);
      console.log("Success:", response.data.posts);
      setSave(false);
      alert('Registered successfully.');
      navigate('/Forms');
    } catch (error) {
      console.error("Error:", error);
      alert('Registration Failed');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
              <b>Sign Up</b>
            </Typography>
            <Grid container spacing={2} direction="column" alignItems="stretch">
              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                  
                />
              </Grid>

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
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
