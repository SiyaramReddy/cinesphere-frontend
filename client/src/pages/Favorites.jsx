import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from '../utilities/axiosInstance';
import MovieList from '../components/MovieList';
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import Header from '../components/Header'; // Assuming you have a Header component
import { useTheme } from '@mui/material/styles';

const Favorites = () => {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('title');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/favourites?page=${page}&sort=${sort}&filter=${filter}`);
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Error fetching favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [page, sort, filter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
          <Typography variant="h4" sx={{ mb: 3 , color: theme.palette.text.primary }}>
            My Favorites
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort By</InputLabel>
                <Select value={sort} onChange={handleSortChange} label="Sort By">
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="release_date">Release Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Filter</InputLabel>
                <Select value={filter} onChange={handleFilterChange} label="Filter">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="high_rating">High Rating</MenuItem>
                  <MenuItem value="recent">Recently Added</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          ) : movies.length === 0 ? (
            <Typography variant="h6">
              No movies in your favorites.
            </Typography>
          ) : (
            <MovieList movies={movies} page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Favorites;