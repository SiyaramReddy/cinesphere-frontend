import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  CardMedia,
  Rating,
  Modal,
  TextField,
} from "@mui/material";
import axios from '../utilities/axiosInstance';

import { useTheme } from "@mui/material/styles";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import ReviewCard from "../components/ReviewCard";

const MoviePage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/movie/${id}`);
        const data = response.data; // Axios automatically parses the response as JSON
        console.log(data);
        setMovie(data.movie);
        setReviews(data.movie.reviews || []);
        setProviders(data.providers || []);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };

    const fetchWatchlistStatus = async () => {
      try {
        const response = await axios.get(`/movie/watchlist/${id}`);
        setIsInWatchlist(response.data.isInWatchlist);
      } catch (error) {
        console.log('Error fetching watchlist status:', error);
      }
    };

    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(`/movie/favorites/${id}`);
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.log('Error fetching favorite status:', error);
      }
    };

    fetchMovieData();
    fetchWatchlistStatus();
    fetchFavoriteStatus();
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(`/movie/watchlist`, { movieId: id });
      setIsInWatchlist(true);
    } catch (error) {
      console.log('Error adding to watchlist:', error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      await axios.delete(`/movie/watchlist/${id}`);
      setIsInWatchlist(false);
    } catch (error) {
      console.log('Error removing from watchlist:', error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/movie/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await axios.post(`/movie/favorites`, { movieId: id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
  };

  const handleSubmitReview = async () => {
    try {
      await axios.post(`/movie/reviews`, {
        movieId: id,
        text: reviewText,
        rating: reviewRating,
      });
      setReviews([...reviews, { text: reviewText, rating: reviewRating, created_at: new Date() }]);
      setReviewText('');
      setReviewRating(0);
      handleCloseReviewModal();
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  // If movie data is not loaded yet, display a loading message
  if (!movie) {
    return <Typography variant="h6" sx={{ padding: 2 }}>Loading movie details...</Typography>;
  }
// Step 1: Extract data starting from index 2
const filteredData = movie.ratings.slice(2);

// Step 2: Define the required range with precision of 0.5
const requiredRatings = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

// Step 3: Map required ratings and assign counts
const ratingsData = requiredRatings.map((rating) => {
  const match = filteredData.find((item) => parseFloat(item.rating) === parseFloat(rating));
  return {
    rating: parseFloat(rating), // Numeric rating
    count: match ? parseFloat(match.count) : 0 // Assign count or 0 if not present
  };
});

// Step 4: Sort the result numerically by rating
ratingsData.sort((a, b) => a.rating - b.rating);

console.log(ratingsData);

  return (
    <>
      <Header isLoggedIn={true} />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>
        <Sidebar sx={{ width: "15%", bgcolor: theme.palette.background.paper, borderRight: `1px solid ${theme.palette.divider}` }} />

        <Box sx={{ flex: 1, position: "relative" }}>
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: "40%", backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover", backgroundPosition: "center", "&::after": {
              content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: `linear-gradient(to bottom, ${theme.palette.background.paper}FF, ${theme.palette.background.default}33)`
            }
          }} />
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: "40%", backgroundImage: `url(https://image.tmdb.org/t/p/original${+movie.backdrop_path})`,
            backgroundSize: "cover", backgroundPosition: "center", filter: "blur(6px)", "&::after": {
              content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: `${theme.palette.background.paper}88`
            }
          }} />

          <Container sx={{ position: "relative", pt: 4, marginBottom: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <CardMedia component="img" image={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={movie.title} sx={{ borderRadius: 1, width: "100%", maxWidth: 200, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <Rating name="read-only-rating" value={parseFloat(movie.ratings[0].count).toFixed(1)} precision={0.1} readOnly sx={{ color: theme.palette.primary.main }} />
  <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontSize: "0.9rem" }}>
    {parseFloat(movie.ratings[0].count).toFixed(1)}
  </Typography>
</Box>
</Box>

<Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
<Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
{parseFloat(movie.ratings[1].count)} Ratings
</Typography>
<ResponsiveContainer width="100%" height={150}>
  <BarChart data={ratingsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
  <XAxis
dataKey="rating"
type="number"
domain={[0, 5]}
ticks={[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]} // Explicitly set the tick values
tick={{ fill: theme.palette.text.primary }}
/>

    <Tooltip />
    <Bar dataKey="count" fill={theme.palette.primary.main} />
  </BarChart>
</ResponsiveContainer>
</Box>
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  {movie.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  {movie.genres} | {movie.runtime} mins | {new Date(movie.release_date).getFullYear()}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  {movie.overview}
                </Typography>

                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                  {movie.tagline}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    size="small"
                    startIcon={isInWatchlist ? <CheckIcon /> : <AddIcon />}
                    variant={isInWatchlist ? "contained" : "outlined"}
                    color="primary"
                    onClick={isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
                  >
                    Watchlist
                  </Button>
                  <Button
                    size="small"
                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    variant="outlined"
                    color={isFavorite ? "error" : "primary"}
                    onClick={handleToggleFavorite}
                  >
                    Favorite
                  </Button>
                  <Button size="small" startIcon={<RateReviewIcon />} variant="outlined" onClick={handleOpenReviewModal}>
                    Review
                  </Button>
                </Box>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  Recent Reviews
                  <Button component={Link} to={`/movie/${id}/reviews`} size="small" variant="contained" color="primary">
                    Show All
                  </Button>
                </Typography>

                <Box sx={{ bgcolor: theme.palette.background.default, borderRadius: 1, p: 2 }}>
                  {reviews.length > 0 ? (
                    reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                  ) : (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Be the first one to review!
                    </Typography>
                  )}
                </Box>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mt: 3 }}>
                  Available On
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  {providers && providers.length > 0 ? (
                    providers.map((provider, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CardMedia
                          component="img"
                          image={`https://image.tmdb.org/t/p/w500${provider.provider_logo}`}
                          alt={provider.provider_name}
                          sx={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                          {provider.provider_name}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      No providers available.
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Review Modal */}
      <Modal open={openReviewModal} onClose={handleCloseReviewModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add a Review
          </Typography>
          <Rating
  name="review-rating"
  value={reviewRating}
  onChange={(event, newValue) => setReviewRating(newValue)}
  precision={0.5}
  sx={{
    mb: 2,
    color: theme.palette.primary.main, // Set the primary color here
  }}
/>

          <TextField
            label="Review"  
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MoviePage;