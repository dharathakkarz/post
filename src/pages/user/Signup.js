

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const SignUp = () => {
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.some(user => user.email === data.email);

      if (userExists) {
        setError('Email already exists. Please login instead.');
        return;
      }


      const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'secret key').toString();

      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: encryptedPassword
      };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      await signUp(data.email, encryptedPassword, data.firstName, data.lastName, data.mobileNumber);

      navigate('/login');
    } catch (error) {
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
     
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <Typography variant="body2" color="error">This field is required</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <Typography variant="body2" color="error">This field is required</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                type="email"
                {...register('email', { required: true })}
                onChange={() => setError('')} // Clear error when typing a new email
              />
              {errors.email && <Typography variant="body2" color="error">This field is required</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Mobile Number"
                type="tel"
                {...register('mobileNumber', { required: true })}
              />
              {errors.mobileNumber && <Typography variant="body2" color="error">This field is required</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                {...register('password', { required: true, minLength: 6 })}
              />
              {errors.password && (
                <Typography variant="body2" color="error">
                  {errors.password.type === 'required' ? 'This field is required' : 'Password must be at least 6 characters'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', { required: true })}
              />
              {errors.confirmPassword && <Typography variant="body2" color="error">This field is required</Typography>}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          <Typography variant="body2" color="textSecondary">
            Already registered? <a href="/login">Login here</a>.
          </Typography>
        </form>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </div>
    </Container>
  );
};

export default SignUp;
