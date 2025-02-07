import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer'; // For Analytics
import StarIcon from '@mui/icons-material/Star'; // For Recommendations
import { useTheme } from '@mui/material/styles';
const Sidebar = () => {
  const theme=useTheme();
  return (
    <Box sx={{
      width: '15%',
      bgcolor: theme.palette.background.default,
      borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'}`,
      padding: 2,
    }} >
      <Typography variant="h6" sx={{ marginBottom: 2 , color:'text.primary'}}>
        Menu
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.primary' }}>
              <HomeIcon />
            </IconButton>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              Home
            </Typography>
          </Box>
        </Link>
        <Link to="/analytics" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.primary' }}>
              <EqualizerIcon />
            </IconButton>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              Analytics
            </Typography>
          </Box>
        </Link>
        <Link to="/recommendations" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.primary' }}>
              <StarIcon />
            </IconButton>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              Recommendations
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
