import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Radio, RadioGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { color } from 'framer-motion';

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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('M');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Date of Birth:', dob);
    console.log('Gender:', gender);
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
              Register to CineSphere
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              {/* Email Field */}
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
              {/* Password Field */}
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
              {/* Date of Birth Field */}
   <TextField
  fullWidth
  label="Date of Birth"
  type="date"
  variant="outlined"
  margin="normal"
  value={dob}
  onChange={(e) => setDob(e.target.value)} // ensures the value is in yyyy-mm-dd format
  InputLabelProps={{
    style: { color: theme.palette.text.secondary },
    shrink: true, // Keeps the label above the input
  }}
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


              {/* Gender Field */}
              <FormControl fullWidth variant="outlined" margin="normal">
  <InputLabel style={{ color: theme.palette.text.secondary }}>Gender</InputLabel>
  <Select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    label="Gender"
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
  >
    <MenuItem
      value="M"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        '&.Mui-selected': {
          backgroundColor: 'black', // Consistent black background when selected
          color: 'white',
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#333', // Slightly lighter black when hovered and selected
        },
        '&:hover': {
          backgroundColor: '#333', // Slightly lighter black when hovered
        },
      }}
    >
      Male
    </MenuItem>
    <MenuItem
      value="F"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        '&.Mui-selected': {
          backgroundColor: 'black', // Consistent black background when selected
          color: 'white',
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#333', // Slightly lighter black when hovered and selected
        },
        '&:hover': {
          backgroundColor: '#333', // Slightly lighter black when hovered
        },
      }}
    >
      Female
    </MenuItem>
  </Select>
</FormControl>

              {/* Submit Button */}
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
                Register
              </Button>
            </form>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterPage;
