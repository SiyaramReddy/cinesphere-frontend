import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../utilities/theme/ThemeContext'; // Import useTheme from the global theme context
import { lightTheme, darkTheme } from '../utilities/theme/theme'; // Import themes
import Header from '../utilities/Header'; // Import Header component
import MovieIcon from '@mui/icons-material/Movie';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { motion } from 'framer-motion'; // Importing framer-motion for animations
import { ThemeProvider } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';


const LandingPage = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Get the current theme state from context
  const navigate = useNavigate(); // Hook for navigation

  // Fade-in animation variants using framer-motion
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Function to check if the token is valid
  const checkTokenValidity = (token) => {
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Current time in seconds
  
      // Check if the token was issued within the last 1 hour (3600 seconds)
      const isTokenValid = currentTime - decodedToken.iat <= 3600;
  
      return isTokenValid; // Return whether the token is valid within the last hour
    } catch (error) {
      console.error('Invalid token', error);
      return false; // Token is invalid
    }
  };
  

  // Check if the user is already logged in (i.e., token exists in localStorage and is valid)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && checkTokenValidity(token)) {
      // If a valid token exists, redirect to Dashboard
      navigate('/dashboard');
    }
  }, [navigate]); // Re-run effect if navigate changes

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <Box
        sx={{
          minHeight: '90vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to CineSphere
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 4 }}>
            Join us to explore the world of movies and entertainment.
          </Typography>
          <Box>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Register
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary">
                Login
              </Button>
            </Link>
          </Box>

          {/* Cards Section */}
          <Grid container spacing={4} sx={{ marginTop: 6 }}>
            {/* Movie Tracking Card */}
            <Grid item xs={12} sm={4}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }} // Animation duration
              >
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: isDarkMode ? '#1c1c1c' : '#ffffff', // Card background color based on the theme
                    color: isDarkMode ? 'text.primary' : 'text.primary', // Card text color based on the theme
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <MovieIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
                      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Movie Tracking
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Keep track of the movies you've watched and get insights on your viewing habits.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>

            {/* Movie Analytics Card */}
            <Grid item xs={12} sm={4}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }} // Animation duration
              >
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: isDarkMode ? '#1c1c1c' : '#ffffff', // Card background color based on the theme
                    color: isDarkMode ? 'text.primary' : 'text.primary', // Card text color based on the theme
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <BarChartIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
                      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Movie Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dive deep into movie trends, ratings, and your personal analytics.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>

            {/* Movie Recommendations Card */}
            <Grid item xs={12} sm={4}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }} // Animation duration
              >
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: isDarkMode ? '#1c1c1c' : '#ffffff', // Card background color based on the theme
                    color: isDarkMode ? 'text.primary' : 'text.primary', // Card text color based on the theme
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <StarBorderIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
                      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Movie Recommendations
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get movie recommendations based on your preferences and viewing history.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
