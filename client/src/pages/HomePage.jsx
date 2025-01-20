import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/SideBar'; // Import Left Sidebar component
import { useTheme } from '../utilities/theme/ThemeContext'; // Import custom theme context

const HomePage = () => {
  const { isDarkMode } = useTheme(); // Get theme context
  const [selectedButton, setSelectedButton] = useState('Today'); // State to track selected button

  // Function to handle button click and set the selected button
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Header isLoggedIn={true} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <Sidebar
          sx={{
            width: '15%',
            bgcolor: 'background.default',
            borderRight: `1px solid ${isDarkMode ? '#424242' : '#e0e0e0'}`,
            padding: 2,
          }}
        />

        {/* Trending Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, color: 'text.primary' }}>
            Trending
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            {/* Button for Today */}
            <Button
              variant={selectedButton === 'Today' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('Today')}
            >
              Today
            </Button>

            {/* Button for This Week */}
            <Button
              variant={selectedButton === 'This Week' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('This Week')}
            >
              This Week
            </Button>

            {/* Button for This Month */}
            <Button
              variant={selectedButton === 'This Month' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('This Month')}
            >
              This Month
            </Button>
          </Box>

          {/* Trending Content Placeholder */}
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            Display trending movies, series, or recommendations here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;