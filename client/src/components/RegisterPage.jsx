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

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../utilities/theme/theme';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../utilities/Header';
import axios from 'axios';
import { useTheme } from '../utilities/theme/ThemeContext';

const RegisterPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();  // Use the theme context to get the current theme and toggle function
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
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

    // Validate inputs
    if (!name) errors.name = 'Name is required';
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (!dob) errors.dob = 'Date of birth is required';

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        username,
        password,
        dob,
        gender,
      });
      setSuccess('Registration successful! Redirecting to Login Page...');
      console.log(response);
      setName('');
      setUsername('');
      setPassword('');
      setDob('');
      setGender('Male');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <Box
        sx={{
          minHeight: "90vh",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="xs" sx={{ paddingTop: 0 }}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "background.paper",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ marginBottom: 2, color: "text.primary" }}
            >
              Register for CineSphere
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
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
              />
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                error={Boolean(fieldErrors.username)}
                helperText={fieldErrors.username}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password}
              />
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                margin="normal"
                error={Boolean(fieldErrors.dob)}
                helperText={fieldErrors.dob}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Register
              </Button>
            </form>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Already have an account?{" "}
                <Typography
                  component={Link}
                  to="/login"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Login here
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterPage;
