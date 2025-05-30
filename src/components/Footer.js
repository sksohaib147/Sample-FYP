import React from 'react';
import { Box, Container, Grid, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box sx={{ bgcolor: 'black', color: 'white', mt: 6, pt: 6, pb: 2 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography fontWeight={700} mb={2}>Support</Typography>
          <Typography variant="body2">sohaibsikandar@yahoo.com</Typography>
          <Typography variant="body2">+92 3168825998</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography fontWeight={700} mb={2}>Account</Typography>
          <Typography variant="body2">
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>My Account</Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Login / Register</Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Shop</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography fontWeight={700} mb={2}>Quick Link</Typography>
          <Typography variant="body2">
            <Link to="/privacy-policy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/terms-of-use" style={{ color: 'white', textDecoration: 'none' }}>Terms of Use</Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: 'grey.800', my: 3 }} />
      <Typography variant="body2" color="grey.500" align="center">
        © Copyright Paws and Claws 2024. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer; 