import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, InputBase, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Avatar from '@mui/material/Avatar';

const Header = ({ isDarkMode, onToggleTheme, isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the profile dropdown
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State to manage logout confirmation dialog
  const pfp = localStorage.getItem('pfp');
  const navigate = useNavigate();

  // Open the profile dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the profile dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open logout confirmation dialog
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
    handleMenuClose(); // Close the dropdown
  };

  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    // Remove the token and profile picture from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('pfp');

    // Make a call to logout API (adjust URL if needed)
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Redirect to homepage after logout
    navigate('/');
  };

  // Handle canceling logout
  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: isLoggedIn ? (isDarkMode ? 'primary.main' : '#0abab5') : '#0abab5',
        color: isLoggedIn ? 'text.primary' : '#ffffff',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* CineSphere Brand */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Orbitron, sans-serif',
              color: isLoggedIn ? 'text.primary' : '#ffffff',
            }}
          >
            CineSphere
          </Typography>
        </Link>

        {/* Search Bar (next to CineSphere brand) */}
        {isLoggedIn && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '40%',
              bgcolor: 'background.paper',
              borderRadius: 1,
              paddingX: 1,
              marginLeft: 2, // Adding space between the brand and search bar
            }}
          >
            <InputBase
              placeholder="Search movies, genres, or actors..."
              sx={{
                width: '100%',
                color: 'text.primary',
              }}
            />
          </Box>
        )}

        {/* Icons and Profile (on the right side) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn && (
            <>
              {/* Favourites */}
              <IconButton component={Link} to="/favourites" color="inherit" sx={{ display: 'flex', flexDirection: 'column' }}>
                <FavoriteIcon />
                <Typography variant="caption" sx={{ color: 'text.primary' }}>
                  Favourites
                </Typography>
              </IconButton>

              {/* My Movies */}
              <IconButton component={Link} to="/my-movies" color="inherit" sx={{ display: 'flex', flexDirection: 'column' }}>
                <MovieIcon />
                <Typography variant="caption" sx={{ color: 'text.primary' }}>
                  My Movies
                </Typography>
              </IconButton>

              {/* Watchlist */}
              <IconButton component={Link} to="/watchlist" color="inherit" sx={{ display: 'flex', flexDirection: 'column' }}>
                <ListAltIcon />
                <Typography variant="caption" sx={{ color: 'text.primary' }}>
                  Watchlist
                </Typography>
              </IconButton>

              {/* Reviews */}
              <IconButton component={Link} to="/reviews" color="inherit" sx={{ display: 'flex', flexDirection: 'column' }}>
                <RateReviewIcon />
                <Typography variant="caption" sx={{ color: 'text.primary' }}>
                  Reviews
                </Typography>
              </IconButton>
            </>
          )}

          {/* Theme Toggle Button (Always Visible) */}
          <IconButton onClick={onToggleTheme} sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Profile Avatar (only shown when logged in) */}
          {isLoggedIn && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="Profile Picture" src={pfp} sx={{ width: 35, height: 35 }} />
              </IconButton>

              {/* Profile Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            No
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
