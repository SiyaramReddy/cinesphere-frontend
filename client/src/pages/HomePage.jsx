import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import axios from '../utilities/axiosInstance';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; // Assuming you have a Header component
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import { useTheme } from '@mui/material/styles';

const HomePage = () => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState('Today');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/home?period=${selectedButton.toLowerCase()}`);
        setTrendingMovies(response.data.movies[0]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching trending movies');
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [selectedButton]);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <Sidebar sx={{
          width: '15%',
          bgcolor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff'}`,
          padding: 2,
        }} />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: theme.palette.text.primary, fontWeight: 'bold' }}>
            Trending Movies
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button
              variant={selectedButton === 'Today' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('Today')}
              sx={{ mx: 1 }}
            >
              Today
            </Button>
            <Button
              variant={selectedButton === 'Week' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('Week')}
              sx={{ mx: 1 }}
            >
              Week
            </Button>
            <Button
              variant={selectedButton === 'Month' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleButtonClick('Month')}
              sx={{ mx: 1 }}
            >
              Month
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {trendingMovies.map((movie, index) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.3}>
                 
                    <Typography
                      variant="h6"
                      sx={{
                        right: 8,
                        bottom: 8,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <MovieCard movie={movie} sx={{ height: '50%',width:'50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} />
            
                 
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;