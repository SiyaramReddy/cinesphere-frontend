import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../utilities/theme/theme'; // Import themes
import Header from '../utilities/Header'; // Import Header component
import { useTheme } from '../utilities/theme/ThemeContext'; // Import useTheme from global context
import axios from 'axios';

const LoginPage = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme context
  const navigate = useNavigate(); // Use navigate hook to redirect after login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if user is already authenticated (you can replace this with your auth logic)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token'); // Example check (you can replace with your auth check logic)
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to home/dashboard if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation: Check if fields are filled
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });

      console.log(response); // Log the response for debugging
      setSuccess('Login successful! Redirecting...');
      
      // Store authentication token in localStorage (or cookies/session)
      localStorage.setItem('token', response.data.token);

      // Redirect to a different page (e.g., home/dashboard) upon success
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.error || 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <Box
        sx={{
          minHeight: "90vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 0,
        }}
      >
        <Container maxWidth="xs" sx={{ paddingTop: 0 }}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: isDarkMode ? "#1a1a1a" : "#f4f4f4",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
              Login to CineSphere
            </Typography>
            {error && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                sx={{ marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
            {success && (
              <Typography
                color="primary"
                variant="body2"
                align="center"
                sx={{ marginBottom: 2, color: "#28a745" }}
              >
                {success}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Typography
                  component={Link}
                  to="/register"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Register here
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
