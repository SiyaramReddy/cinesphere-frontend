import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme with Tiffany Blue palette
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
      secondary: '#0abab5', // Tiffany Blue text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xs" sx={{ padding: 3 }}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: '#1a1a1a', // Dark background for card
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
              Login to CineSphere
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.dark,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.dark,
                    },
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                  Register here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
