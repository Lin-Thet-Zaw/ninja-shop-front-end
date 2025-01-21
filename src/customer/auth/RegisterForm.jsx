import { Button, Grid, TextField, useMediaQuery, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector((store) => store);

  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Responsive detection

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handelSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(register(userData));
    console.log('User Data', userData);
  };

  return (
    <Box
      sx={{
        maxWidth: isSmallScreen ? '100%' : '600px', // Adjust width for smaller screens
        margin: '0 auto',
        padding: isSmallScreen ? 2 : 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Register
      </Typography>
      <form onSubmit={handelSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              sx={{
                padding: '.8rem 0',
                bgcolor: '#9155FD',
                color: 'white',
                '&:hover': { bgcolor: '#7848c7' },
              }}
              type="submit"
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography variant="body2">Already have an account?</Typography>
        <Button onClick={() => navigate('/login')} size="small" sx={{ mt: 1 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
