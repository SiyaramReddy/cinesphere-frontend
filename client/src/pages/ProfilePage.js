import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Avatar, TextField, MenuItem } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { useTheme } from '../utilities/theme/ThemeContext';
import axios from '../utilities/axiosInstance';

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    dob: '',
    gender: '',
    profile_picture: '',
    created_at: '',
  });

  // Fetch profile data when the page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, []);

  // Handle edit/save button click
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle save
  const handleSave = async () => {
    try {
      // Ensure the date is in YYYY-MM-DD format
      const formattedProfile = {
        ...profile,
        dob: profile.dob.split('T')[0],
      };
      await axios.put('/profile', formattedProfile);
      setIsEditing(false);
      console.log('Profile saved:', formattedProfile);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  // Format the date of birth for display
  const formattedDob = new Date(profile.dob).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Header isLoggedIn={true} onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <Sidebar
          sx={{
            width: '15%',
            bgcolor: isDarkMode ? 'background.default' : '#e0f7fa',
            padding: 2,
          }}
        />

        {/* Profile Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: isDarkMode ? 'background.paper' : '#ffffff',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Profile Details Heading */}
          <Typography
            variant="h5"
            sx={{
              marginBottom: 2,
              color: isDarkMode ? '#ffffff' : 'text.primary',
              textAlign: 'left',
            }}
          >
            Profile Details
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            {/* Left Section: Profile Picture and Member Info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '30%',
                paddingRight: 3,
              }}
            >
              <Avatar
                sx={{ width: 120, height: 120, marginBottom: 2 }}
                src={profile.profile_picture}
                alt={profile.name}
              />
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? '#ffffff' : 'text.secondary',
                  marginBottom: 1,
                }}
              >
                @{profile.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? '#ffffff' : 'text.secondary',
                  marginBottom: 2,
                }}
              >
                Joined: {new Date(profile.created_at).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            </Box>

            {/* Right Section: Profile Details */}
            <Box sx={{ flex: 1, paddingLeft: 3 }}>
              {isEditing ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                    InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                  />
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={profile.dob.split('T')[0]} // Ensure the date is in YYYY-MM-DD format
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                    InputLabelProps={{ shrink: true, style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                  />
                  <TextField
                    label="Gender"
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    select
                    fullWidth
                    InputProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                    InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: isDarkMode ? '#ffffff' : 'text.primary' }}
                  >
                    <strong>Name:</strong> {profile.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: isDarkMode ? '#ffffff' : 'text.primary' }}
                  >
                    <strong>Date of Birth:</strong> {formattedDob}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: isDarkMode ? '#ffffff' : 'text.primary' }}
                  >
                    <strong>Gender:</strong> {profile.gender}
                  </Typography>
                </Box>
              )}

              <Button
                variant={isEditing ? 'contained' : 'outlined'}
                color="primary"
                sx={{ marginTop: 3 }}
                onClick={isEditing ? handleSave : handleEditClick}
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;