import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0abab5', // Tiffany Blue
      light: '#5fe2db',
      dark: '#0a8680',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#0abab5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const errors = {};

    if (!name) errors.name = 'Name is required.';
    if (!username) errors.username = 'Username is required.';
    if (!password) errors.password = 'Password is required.';
    if (!dob) errors.dob = 'Date of Birth is required.';
    if (!gender) errors.gender = 'Gender is required.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); // Clear field-specific errors

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        username,
        password,
        dob,
        gender,
      });
      setSuccess('Registration successful! Welcome to CineSphere.');
    } catch (err) {
      console.error('Error registering:', err);
      setError(
        err.response?.data?.error || 'An unexpected error occurred. Please try again.'
      );
    }
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
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
              Register to CineSphere
            </Typography>
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography
                color="primary"
                variant="body2"
                align="center"
                sx={{
                  marginBottom: 2,
                  color: '#28a745', // Green color for success message
                }}
              >
                {success}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
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
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
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
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
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
                label="Date of Birth"
                type="date"
                variant="outlined"
                margin="normal"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                error={!!fieldErrors.dob}
                helperText={fieldErrors.dob}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                  shrink: true,
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
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldErrors.gender}
              >
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
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                <Typography variant="body2" color="error">
                  {fieldErrors.gender}
                </Typography>
              </FormControl>
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
