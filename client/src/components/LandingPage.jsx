import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper, Grid, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import MovieIcon from '@mui/icons-material/Movie';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import BarChartIcon from '@mui/icons-material/BarChart';

// Create a custom theme using Tiffany's palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#0abab5', // Tiffany Blue
      light: '#5fe2db', // Light Tiffany Blue
      dark: '#0a8680', // Dark Tiffany Blue
    },
    background: {
      default: '#000000', // Black background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#0abab5', // Tiffany accent text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', position: 'relative' }}>
        {/* Radial Background Effect */}
        <div className="background-effect" />

        {/* AppBar for navigation */}
        <AppBar position="static" color="primary" sx={{ padding: 2 }}>
          <Toolbar>
            <Typography variant="h3" style={{ fontFamily: 'Times New Roman, serif' }} sx={{ flexGrow: 1 }}>
              CineSphere
            </Typography>

            {/* Login Button */}
            <Link to="/login">
              <Button
                color="primary"
                variant="contained"
                size="large"
                sx={{
                  marginLeft: 2,
                  border: '2px solid black',
                  borderRadius: '4px',
                }}
              >
                Login
              </Button>
            </Link>

            {/* Sign Up Button - Link to RegisterPage */}
            <Link to="/register">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  marginLeft: 2,
                  border: '2px solid black',
                  borderRadius: '4px',
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Toolbar>
        </AppBar>

        {/* Hero Section with Animation */}
        <Box sx={{ padding: 4, textAlign: 'center', flexGrow: 1 }}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h2" style={{ fontFamily: 'Lucida Sans, serif' }} sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Welcome to CineSphere
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Typography variant="h5" style={{ fontFamily: 'Lucida Sans, serif' }} sx={{ marginBottom: 4 }}>
                Discover, track, and review your favorite movies.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <Button variant="contained" color="primary" size="large" sx={{ marginRight: 2 }}>
                Get Started
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Learn More
              </Button>
            </motion.div>
          </Container>
        </Box>

        {/* Feature Boxes */}
        <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Paper sx={{ padding: 4, textAlign: 'center', bgcolor: '#1a1a1a' }}>
                  <IconButton color="primary" sx={{ fontSize: 60 }}>
                    <MovieIcon fontSize="inherit" />
                  </IconButton>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="h6" sx={{ marginTop: 2 }}>
                    Track Movies
                  </Typography>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="body2">
                    Stay updated with your watchlist and upcoming releases.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Paper sx={{ padding: 4, textAlign: 'center', bgcolor: '#1a1a1a' }}>
                  <IconButton color="primary" sx={{ fontSize: 60 }}>
                    <StarBorderPurple500Icon fontSize="inherit" />
                  </IconButton>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="h6" sx={{ marginTop: 2 }}>
                    Write Reviews
                  </Typography>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="body2">
                    Share your thoughts and read reviews from others.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <Paper sx={{ padding: 4, textAlign: 'center', bgcolor: '#1a1a1a' }}>
                  <IconButton color="primary" sx={{ fontSize: 60 }}>
                    <BarChartIcon fontSize="inherit" />
                  </IconButton>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="h6" sx={{ marginTop: 2 }}>
                    Analytics
                  </Typography>
                  <Typography style={{ fontFamily: 'Times New Roman, serif' }} variant="body2">
                    Discover trends and insights about your favorite genres and actors.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
