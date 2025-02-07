import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../utilities/axiosInstance';
import MovieList from '../components/MovieList';
import Header from '../components/Header'; // Assuming you have a Header component
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const { searchQuery, yearRange, genres, languages } = location.state || {};
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('title_asc');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/search', {
          params: { searchQuery, yearRange, genres, languages, page, sort: sortOption }
        });
        setSearchResults(response.data.movies[0]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Error fetching search results');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, yearRange, genres, languages, page, sortOption]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
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
            Search Results
          </Typography>

          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="title_asc">Title (A-Z)</MenuItem>
              <MenuItem value="title_desc">Title (Z-A)</MenuItem>
              <MenuItem value="release_date_asc">Release Date (Oldest First)</MenuItem>
              <MenuItem value="release_date_desc">Release Date (Newest First)</MenuItem>
              <MenuItem value="rating_asc">Rating (Lowest First)</MenuItem>
              <MenuItem value="rating_desc">Rating (Highest First)</MenuItem>
              <MenuItem value="runtime_asc">Runtime (Shortest First)</MenuItem>
              <MenuItem value="runtime_desc">Runtime (Longest First)</MenuItem>
            </Select>
          </FormControl>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          ) : (
            <MovieList movies={searchResults} totalPages={totalPages} page={page} onPageChange={handlePageChange} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchResultPage;