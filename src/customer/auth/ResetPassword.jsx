import { Button, Grid, TextField, useMediaQuery, Box, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Use useSearchParams for query parameters
import { resetPassword } from '../../State/Auth/ForgetPassword/Action';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detect small screens
  const { passwordReset } = useSelector(store => store);
  const [searchParams] = useSearchParams(); // Use useSearchParams for query parameters
  const token = searchParams.get('token'); // Extract token from query parameters
  const isLoading = passwordReset?.isLoading;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordValid = password.length >= 8 && password === confirmPassword;

  const handelSubmit = (event) => {
    event.preventDefault();
    const userData = {
      token,
      password,
    };
    dispatch(resetPassword(userData)); // Dispatch resetPassword action
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
              id="password"
              name="password"
              label="Password"
              fullWidth
              type="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password.length > 0 && password.length < 8}
              helperText={
                password.length > 0 && password.length < 8
                  ? 'Password must be at least 8 characters'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              type="password"
              autoComplete="new-password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={
                confirmPassword.length > 0 && password !== confirmPassword
                  ? 'Passwords do not match'
                  : ''
              }
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
              disabled={isLoading || !isPasswordValid} // Disable the button while loading or if passwords don't match
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ marginRight: 2 }} />
                  Resetting...
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

export default ResetPassword;