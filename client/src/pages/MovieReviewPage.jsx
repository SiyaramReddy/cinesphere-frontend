import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../utilities/axiosInstance';
import Header from '../components/Header'; // Assuming you have a Header component
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import ReviewCard from '../components/ReviewCard'; // Assuming you have a ReviewCard component
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const MovieReviewPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('date_desc');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/movie/${id}/reviews`, {
          params: { page, sort: sortOption }
        });
        console.log(response.data);
        setReviews(response.data.reviews[0]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Error fetching reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, page, sortOption]);

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
            Reviews
          </Typography>

          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="date_asc">Date (Oldest First)</MenuItem>
              <MenuItem value="date_desc">Date (Newest First)</MenuItem>
              <MenuItem value="rating_asc">Rating (Lowest First)</MenuItem>
              <MenuItem value="rating_desc">Rating (Highest First)</MenuItem>
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
            <>
              <Grid container spacing={2}>
                {reviews.map((review) => (
                  <Grid item key={review.id} xs={12}>
                    <ReviewCard review={review} />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MovieReviewPage;