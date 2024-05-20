

// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { TextField, Button, Grid, Typography, Container } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import CryptoJS from 'crypto-js';

// const SignUp = () => {
//   const { signUp } = useAuth();
//   const [error, setError] = useState('');
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     if (data.password !== data.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     // Encrypt the password using crypto-js
//     const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'secretkey123').toString();

//     // Retrieve existing users from local storage
//     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

//     // Check if the email already exists
//     if (existingUsers.some(user => user.email === data.email)) {
//       setError('Email already exists.');
//       return;
//     }

//     // Add the new user to the existing users
//     const newUser = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       mobileNumber: data.mobileNumber,
//       password: encryptedPassword
//     };
//     const updatedUsers = [...existingUsers, newUser];

//     // Save updated users to local storage
//     localStorage.setItem('users', JSON.stringify(updatedUsers));

//     try {
//       await signUp(data.email, encryptedPassword, data.confirmPassword, data.firstName, data.lastName, data.mobileNumber);
//     } catch (error) {
//       setError('Sign up failed. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <div>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="First Name"
//                 {...register('firstName', { required: true })}
//               />
//               {errors.firstName && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Last Name"
//                 {...register('lastName', { required: true })}
//               />
//               {errors.lastName && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 {...register('email', { required: true })}
//               />
//               {errors.email && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Mobile Number"
//                 type="tel"
//                 {...register('mobileNumber', { required: true })}
//               />
//               {errors.mobileNumber && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 {...register('password', { required: true })}
//               />
//               {errors.password && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Confirm Password"
//                 type="password"
//                 {...register('confirmPassword', { required: true })}
//               />
//               {errors.confirmPassword && <Typography variant="body2" color="error">This field is required</Typography>}
//             </Grid>
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Sign Up
//           </Button>
//         </form>
//         {error && <Typography variant="body2" color="error">{error}</Typography>}
//       </div>
//     </Container>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Save user data to local storage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password // Note: Password is not encrypted here
      };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Call signUp function
      await signUp(data.email, data.password, data.firstName, data.lastName, data.mobileNumber);
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
                {...register('password', { required: true })}
              />
              {errors.password && <Typography variant="body2" color="error">This field is required</Typography>}
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
        </form>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </div>
    </Container>
  );
};

export default SignUp;
