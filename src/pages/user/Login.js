
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/');
    }
  }, [navigate]); 

  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find((user) => user.email === data.email);

    if (user) {
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);
      if (data.password === decryptedPassword) {
        localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, password: user.password }));
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          {...register('email', { required: true })}
        />
        {errors.email && <Alert severity="error" sx={{ mt: 2 }}>Email is required</Alert>}
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          {...register('password', { required: true })}
        />
        {errors.password && <Alert severity="error" sx={{ mt: 2 }}>Password is required</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>

        <Typography variant="body2" color="textSecondary">
          New User? <a href="/signup">Signup here</a>.
        </Typography>
      </form>
    </Box>
  );
};

export default Login;

