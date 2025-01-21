import { Button, Grid, TextField, useMediaQuery, Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/Auth/Action';
import { CircularProgress } from '@mui/material';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detect small screens
  const isLoading = useSelector(state => state.auth.isLoading);
  
  const handelSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(login(userData));
    console.log('User Data', userData);
  };

  return (
    <Box
      sx={{
        maxWidth: isSmallScreen ? '100%' : '400px', // Adjust width for smaller screens
        margin: '0 auto', // Center on screen
        padding: isSmallScreen ? 2 : 4, // Adjust padding
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <form onSubmit={handelSubmit}>
        <Grid container spacing={3}>
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
              fullWidth
              type="password"
              autoComplete="password"
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
              disabled={isLoading}  // Disable the button while loading
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ marginRight: 2 }} />
                  Login...
                </>
              ) : (
                'Login'
              )}
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
        <Typography variant="body2">Don't have an account?</Typography>
        <Button
          onClick={() => navigate('/register')}
          size="small"
          sx={{ mt: 1 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
