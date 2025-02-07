import React from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import MovieCard from './MovieCard';

const MovieList = ({ movies, page, totalPages, onPageChange }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {movies.map((movie, index) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={3} xl={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination count={totalPages} page={page} onChange={onPageChange} />
      </Box>
    </Box>
  );
};

export default MovieList;
