import { Button, Grid, TextField, useMediaQuery, Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../State/Auth/ForgetPassword/Action';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detect small screens
  const { passwordReset } = useSelector(store => store);
  const isLoading = passwordReset?.isLoading; // Extract isLoading from passwordReset state
  const message = passwordReset?.message;

  const handelSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
    };
    dispatch(forgetPassword(userData)); // Dispatch forgetPassword action
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
                  Sending reset link...
                </>
              ) : (
                'Reset Password'
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
        <Typography variant="body2">Remember your password?</Typography>
        <Button
          onClick={() => navigate('/login')}
          size="small"
          sx={{ mt: 1 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;