import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from '../utilities/axiosInstance';
import MovieReviewCard from '../components/MovieReviewCard';
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import Header from '../components/Header'; // Assuming you have a Header component
import { useTheme } from '@mui/material/styles';

const ReviewPage = () => {
  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('movieTitle');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/reviews?sort=${sort}&filter=${filter}`);
        setReviews(response.data.reviews[0]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [sort, filter]);

  const handleSaveReview = async (editedReview) => {
    try {
      await axios.put(`/reviews/${editedReview.id}`, editedReview);
      setReviews((prevReviews) =>
        prevReviews.map((review) => (review.id === editedReview.id ? editedReview : review))
      );
    } catch (error) {
      setError('Error saving review');
    }
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
          <Typography variant="h4" sx={{ mb: 3 }}>
            My Reviews
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort By</InputLabel>
                <Select value={sort} onChange={handleSortChange} label="Sort By">
                  <MenuItem value="movieTitle">Movie Title</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="created_at">Date</MenuItem>
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
          ) : reviews.length === 0 ? (
            <Typography variant="h6">
              No reviews found.
            </Typography>
          ) : (
            reviews.map((review) => (
              <MovieReviewCard key={review.id} review={review} onSave={handleSaveReview} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReviewPage;