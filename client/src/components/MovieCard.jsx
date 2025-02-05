import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: 250,
        m: 1,
        bgcolor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea component={Link} to={`/movie/${movie.id}`} sx={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <CardContent sx={{ height: 100 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={parseFloat(movie.rating).toFixed(1)} precision={0.1} readOnly sx={{ color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
              {parseFloat(movie.rating).toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
            {movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;