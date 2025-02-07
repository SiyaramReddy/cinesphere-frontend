import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, InputBase, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, Slider, Select, FormControl, InputLabel, OutlinedInput, Chip, Popover } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../utilities/theme/ThemeContext'; // Import custom theme context

const Header = ({ isLoggedIn }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme(); // Use custom theme context
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the profile dropdown
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State to manage logout confirmation dialog
  const [searchQuery, setSearchQuery] = useState('');
  const [yearRange, setYearRange] = useState([1900, 2023]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null); // State to manage the filter dropdown
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
    await fetch('http://localhost:5000/auth/logout', {
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

  // Handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle year range change
  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  // Handle genres change
  const handleGenresChange = (event) => {
    setGenres(event.target.value);
  };

  // Handle languages change
  const handleLanguagesChange = (event) => {
    setLanguages(event.target.value);
  };

  // Handle search
  const handleSearch = () => {
    navigate('/search', { state: { searchQuery, yearRange, genres, languages } });
  };

  // Open the filter dropdown
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  // Close the filter dropdown
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setYearRange([1900, 2023]);
    setGenres([]);
    setLanguages([]);
    handleFilterClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.primary.main
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* CineSphere Brand */}
        <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Orbitron, sans-serif',
              color: isLoggedIn ? theme.palette.text.primary : '#ffffff',
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
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
              paddingX: 1,
              marginLeft: 2, // Adding space between the brand and search bar
            }}
          >
            <InputBase
              placeholder="Search movies, genres, or actors..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              sx={{
                width: '100%',
                color: theme.palette.text.primary,
              }}
            />
            <IconButton onClick={handleSearch} sx={{ color: theme.palette.text.primary }}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleFilterClick} sx={{ color: theme.palette.text.primary }}>
              <FilterListIcon />
            </IconButton>
          </Box>
        )}

        {/* Icons and Profile (on the right side) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn && (
            <>
              {/* Favourites */}
              <IconButton
                component={Link}
                to="/favourites"
                color="inherit"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .MuiSvgIcon-root': {
                    transform: 'scale(1.10)', // Apply simple scaling on hover
                    transition: 'transform 0.3s ease', // Smooth transition for scaling
                  },
                }}
              >
                <FavoriteIcon sx={{ color: theme.palette.text.primary }} />
                <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                  Favourites
                </Typography>
              </IconButton>

              {/* Watchlist */}
              <IconButton
                component={Link}
                to="/watchlist"
                color="inherit"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .MuiSvgIcon-root': {
                    transform: 'scale(1.10)', // Apply simple scaling on hover
                    transition: 'transform 0.3s ease', // Smooth transition for scaling
                  },
                }}
              >
                <ListAltIcon sx={{ color: theme.palette.text.primary }} />
                <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                  Watchlist
                </Typography>
              </IconButton>

              {/* Reviews */}
              <IconButton
                component={Link}
                to="/reviews"
                color="inherit"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .MuiSvgIcon-root': {
                    transform: 'scale(1.10)', // Apply simple scaling on hover
                    transition: 'transform 0.3s ease', // Smooth transition for scaling
                  },
                }}
              >
                <RateReviewIcon sx={{ color: theme.palette.text.primary }} />
                <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                  Reviews
                </Typography>
              </IconButton>
            </>
          )}

          {/* Theme Toggle Button (Always Visible) */}
          <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
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

      {/* Filter Dropdown */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ width: 300, mb: 2 }}>
            <Typography gutterBottom>Year Range</Typography>
            <Slider
              value={yearRange}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={1900}
              max={2023}
            />
          </Box>
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>Genres</InputLabel>
            <Select
              multiple
              value={genres}
              onChange={handleGenresChange}
              input={<OutlinedInput label="Genres" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 250, // Set the max height of the dropdown
        overflow: 'auto', // Enable scrolling if the content exceeds the max height
      },
    },
  }}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Science Fiction">Science Fiction</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Documentary">Documentary</MenuItem>
              <MenuItem value="Crime">Crime</MenuItem>
              <MenuItem value="Western">Western</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              <MenuItem value="Fantasy">Fantasy</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
              <MenuItem value="War">War</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Animation">Animation</MenuItem>
              <MenuItem value="Thriller">Thriller</MenuItem>
              <MenuItem value="Mystery">Mystery</MenuItem>
              <MenuItem value="TV Movie">TV Movie</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Languages</InputLabel>
<Select
  multiple
  value={languages}
  onChange={handleLanguagesChange}
  input={<OutlinedInput label="Languages" />}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 250, // Set the max height of the dropdown
        overflow: 'auto', // Enable scrolling if the content exceeds the max height
      },
    },
  }}
>
  <MenuItem value="en">English</MenuItem>
  <MenuItem value="fr">French</MenuItem>
  <MenuItem value="it">Italian</MenuItem>
  <MenuItem value="de">German</MenuItem>
  <MenuItem value="sv">Swedish</MenuItem>
  <MenuItem value="xx">No Language</MenuItem>
  <MenuItem value="ru">Russian</MenuItem>
  <MenuItem value="es">Spanish</MenuItem>
  <MenuItem value="pt">Portuguese</MenuItem>
  <MenuItem value="cs">Czech</MenuItem>
  <MenuItem value="nl">Dutch</MenuItem>
  <MenuItem value="pl">Polish</MenuItem>
  <MenuItem value="el">Greek</MenuItem>
  <MenuItem value="da">Danish</MenuItem>
  <MenuItem value="ja">Japanese</MenuItem>
  <MenuItem value="no">Norwegian</MenuItem>
  <MenuItem value="hi">Hindi</MenuItem>
  <MenuItem value="ar">Arabic</MenuItem>
  <MenuItem value="sq">Albanian</MenuItem>
  <MenuItem value="sl">Slovenian</MenuItem>
  <MenuItem value="he">Hebrew</MenuItem>
  <MenuItem value="bn">Bengali</MenuItem>
  <MenuItem value="fi">Finnish</MenuItem>
  <MenuItem value="ko">Korean</MenuItem>
  <MenuItem value="tl">Tagalog</MenuItem>
  <MenuItem value="uk">Ukrainian</MenuItem>
  <MenuItem value="cn">Chinese</MenuItem>
  <MenuItem value="eo">Esperanto</MenuItem>
  <MenuItem value="zh">Mandarin</MenuItem>
  <MenuItem value="hy">Armenian</MenuItem>
  <MenuItem value="ro">Romanian</MenuItem>
  <MenuItem value="sh">Serbo-Croatian</MenuItem>
  <MenuItem value="wo">Wolof</MenuItem>
  <MenuItem value="ur">Urdu</MenuItem>
  <MenuItem value="hu">Hungarian</MenuItem>
  <MenuItem value="la">Latin</MenuItem>
  <MenuItem value="id">Indonesian</MenuItem>
  <MenuItem value="vi">Vietnamese</MenuItem>
  <MenuItem value="fa">Persian</MenuItem>
  <MenuItem value="ml">Malayalam</MenuItem>
  <MenuItem value="ta">Tamil</MenuItem>
  <MenuItem value="ka">Georgian</MenuItem>
  <MenuItem value="is">Icelandic</MenuItem>
  <MenuItem value="tr">Turkish</MenuItem>
  <MenuItem value="th">Thai</MenuItem>
  <MenuItem value="mk">Macedonian</MenuItem>
  <MenuItem value="sr">Serbian</MenuItem>
  <MenuItem value="nb">Norwegian Bokmål</MenuItem>
  <MenuItem value="bo">Tibetan</MenuItem>
  <MenuItem value="fo">Faroese</MenuItem>
  <MenuItem value="mr">Marathi</MenuItem>
  <MenuItem value="bg">Bulgarian</MenuItem>
  <MenuItem value="bs">Bosnian</MenuItem>
  <MenuItem value="lb">Luxembourgish</MenuItem>
  <MenuItem value="ne">Nepali</MenuItem>
  <MenuItem value="pa">Punjabi</MenuItem>
  <MenuItem value="hr">Croatian</MenuItem>
  <MenuItem value="ps">Pashto</MenuItem>
  <MenuItem value="dz">Dzongkha</MenuItem>
  <MenuItem value="ms">Malay</MenuItem>
  <MenuItem value="et">Estonian</MenuItem>
  <MenuItem value="ca">Catalan</MenuItem>
  <MenuItem value="te">Telugu</MenuItem>
  <MenuItem value="tn">Tswana</MenuItem>
  <MenuItem value="kn">Kannada</MenuItem>
  <MenuItem value="my">Burmese</MenuItem>
  <MenuItem value="lv">Latvian</MenuItem>
  <MenuItem value="cy">Welsh</MenuItem>
  <MenuItem value="ky">Kyrgyz</MenuItem>
  <MenuItem value="eu">Basque</MenuItem>
  <MenuItem value="gl">Galician</MenuItem>
  <MenuItem value="lt">Lithuanian</MenuItem>
  <MenuItem value="ga">Irish</MenuItem>
  <MenuItem value="gd">Scottish Gaelic</MenuItem>
  <MenuItem value="az">Azerbaijani</MenuItem>
  <MenuItem value="af">Afrikaans</MenuItem>
  <MenuItem value="su">Sundanese</MenuItem>
  <MenuItem value="si">Sinhala</MenuItem>
  <MenuItem value="mi">Maori</MenuItem>
  <MenuItem value="ku">Kurdish</MenuItem>
  <MenuItem value="or">Oriya</MenuItem>
  <MenuItem value="mn">Mongolian</MenuItem>
  <MenuItem value="sk">Slovak</MenuItem>
  <MenuItem value="sw">Swahili</MenuItem>
  <MenuItem value="sg">Sango</MenuItem>
  <MenuItem value="mo">Moldavian</MenuItem>
  <MenuItem value="qu">Quechua</MenuItem>
  <MenuItem value="zu">Zulu</MenuItem>
  <MenuItem value="sm">Samoan</MenuItem>
  <MenuItem value="km">Khmer</MenuItem>
  <MenuItem value="yi">Yiddish</MenuItem>
  <MenuItem value="kk">Kazakh</MenuItem>
  <MenuItem value="be">Belarusian</MenuItem>
  <MenuItem value="gu">Gujarati</MenuItem>
</Select>

          </FormControl>
          <Button onClick={handleClearFilters} color="primary" variant="outlined" fullWidth>
            Clear Filters
          </Button>
        </Box>
      </Popover>

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