import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Rating, Button, TextField, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

const MovieReviewCard = ({ review, onSave }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(review);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedReview);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedReview(review);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedReview({ ...editedReview, [name]: value });
  };

  return (
    <Card sx={{ display: 'flex', m: 2, bgcolor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2 }}>
      <Link to={`/movie/${review.movieId}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          sx={{ width: 150, borderRadius: '4px 0 0 4px' }}
          image={`https://image.tmdb.org/t/p/w500/${review.moviePoster}`}
          alt={review.movieTitle}
        />
      </Link>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {review.movieTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(review.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            {isEditing ? (
              <>
                <TextField
                  name="review_text"
                  label="Review"
                  multiline
                  rows={4}
                  value={editedReview.review_text}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2, color: theme.palette.primary.main }}>
                    Rating:
                  </Typography>
                  <Rating
                    name="rating"
                    sx={{ color: theme.palette.primary.main }}
                    value={parseFloat(editedReview.rating)}
                    precision={0.5}
                    onChange={(event, newValue) => setEditedReview({ ...editedReview, rating: newValue })}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2, color: theme.palette.text.primary }}>
                    Rating:
                  </Typography>
                  <Rating precision={0.5} sx={{ color: theme.palette.primary.main }} value={parseFloat(review.rating)} readOnly />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {review.review_text}
                </Typography>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {isEditing ? (
              <>
                <Button variant="contained" color="primary" onClick={handleSaveClick} startIcon={<SaveIcon />}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancelClick} startIcon={<CancelIcon />}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEditClick} startIcon={<EditIcon />}>
                Edit
              </Button>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieReviewCard;