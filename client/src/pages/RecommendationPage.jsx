import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, IconButton, Grid, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header'; // Assuming you have a Header component
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import MovieCard from '../components/MovieCard'; // Assuming you have a MovieCard component
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '../utilities/axiosInstance';

const RecommendationPage = () => {
  const theme = useTheme();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFrame, setTimeFrame] = useState('this_week');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movieOptions, setMovieOptions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchRecommendations = async (movieList) => {
    setLoading(true);
    try {
        console.log(movieList);
      const response = await axios.post('http://localhost:4000/recommend', {
        movie_ids: movieList
      });
      console.log(response.data);
      const recommendedMovies = response.data.recommended_movies;
      const movieIds = recommendedMovies.map(movie => movie.id);
      const movieDetailsResponse = await axiosInstance.post(`/movie/details`, {
        ids: movieIds
      });
      const movieDetails = movieDetailsResponse.data;
      console.log(movieDetails);
      setRecommendations(movieDetails[0]);
      setTotalPages(Math.ceil(movieDetails.length / 10)); // Assuming 10 movies per page
      setLoading(false);
    } catch (error) {
        setError("No recommendations found");
      setLoading(false);
    }
  };

  const handleSearch = async (event, value) => {
    setSearchQuery(value);
    if (value) {
      try {
        const response = await axiosInstance.get('/recommend/search', {
          params: { query: value }
        });
        console.log(response.data);
        setMovieOptions(response.data.movies[0]);
      } catch (error) {
        console.error('Error fetching movie options:', error);
      }
    } else {
      setMovieOptions([]);
    }
  };

  const handleMovieSelect = (event, value) => {
    setSelectedMovie(value);
    if (value) {
      fetchRecommendations([value.id]);
    }
  };

  const handleTimeFrameChange = async (event) => {
    const selectedTimeFrame = event.target.value;
    setTimeFrame(selectedTimeFrame);
    setLoading(true);
    try {
      const response = await axiosInstance.get('/recommend/movies', {
        params: { timeFrame: selectedTimeFrame }
      });
      const movieIds = response.data.movies.map(movie => movie.id);
      fetchRecommendations(movieIds);
    } catch (error) {
      setError('Error fetching movies');
      setLoading(false);
    }
  };

  const fetchRecentFavorites = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/recommend/recent_favorites');
      const movieIds = response.data.movies.map(movie => movie.id);
      console.log(movieIds);
      fetchRecommendations(movieIds);
    } catch (error) {
      setError('Error fetching recent favorites');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeFrame === 'recent_favorites') {
      fetchRecentFavorites();
    }
  }, [timeFrame]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <Sidebar sx={{
          width: '15%',
          bgcolor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'}`,
          padding: 2,
        }} />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: theme.palette.text.primary, fontWeight: 'bold' }}>
            Recommendations
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, width: '100%' }}>
            <Autocomplete
              options={movieOptions}
              getOptionLabel={(option) => option.title}
              onInputChange={handleSearch}
              onChange={handleMovieSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search movies..."
                  variant="outlined"
                  fullWidth
                />
              )}
              sx={{ width: '100%' }}
            />
            <IconButton onClick={() => handleMovieSelect(null, selectedMovie)} sx={{ color: theme.palette.text.primary }}>
              <SearchIcon />
            </IconButton>
          </Box>

          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel>Time Frame</InputLabel>
            <Select
              value={timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
            >
              <MenuItem value="this_week">This Week</MenuItem>
              <MenuItem value="this_month">This Month</MenuItem>
              <MenuItem value="recent_favorites">Recent Favorites</MenuItem>
            </Select>
          </FormControl>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {recommendations.slice((page - 1) * 10, page * 10).map((movie, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RecommendationPage;