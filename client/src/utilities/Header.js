import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ isDarkMode, onToggleTheme }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#0abab5', // Tiffany blue background color
      }}
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ffffff', // Ensures text is readable on the blue background
            }}
          >
            CineSphere
          </Typography>
        </Link>
        <IconButton onClick={onToggleTheme} sx={{ color: '#ffffff' }}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
