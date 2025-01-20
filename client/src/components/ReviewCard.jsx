import React from 'react';
import { Box, Typography, Avatar, Rating, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReviewCard = ({ review }) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', mb: 2, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
      {/* Review Date */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: theme.palette.text.secondary,
        }}
      >
        {new Date(review.created_at).toLocaleDateString()}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={review.profile_picture} sx={{ width: 40, height: 40, mr: 2 }} />
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>
          {review.username}
        </Typography>
      </Box>
      <Rating value={review.rating} precision={0.5} readOnly sx={{ color: theme.palette.primary.main, mb: 1 }} />
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        {review.review_text}
      </Typography>
      <Divider sx={{ mt: 2, bgcolor: theme.palette.divider }} />
    </Box>
  );
};

export default ReviewCard;