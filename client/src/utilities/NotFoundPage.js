import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import WarningIcon from '@mui/icons-material/Warning'; // Use a warning icon

const NotFoundPage = () => {
  const theme = useTheme(); // Get current theme from ThemeProvider

  // Define animation variants for a shake effect
  const iconVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 0], // Smooth rotation
      transition: {
        duration: 2,
        repeat: Infinity, // Infinite shake effect
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default, // Use theme background color
        color: theme.palette.text.primary, // Use theme text color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Warning icon with motion animation */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={iconVariants}
        >
          <WarningIcon
            sx={{
              fontSize: 100,
              color: theme.palette.error.main, // Use theme error color
              marginBottom: 2,
            }}
          />
        </motion.div>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          404 - Oops! Something Went Wrong! 😱
        </Typography>
        <Typography  sx={{ marginBottom: 4 }}>
          It seems like you've taken a wrong turn into the void... The page you're looking for doesn't exist, but don't worry, there's plenty of other things to discover.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            marginBottom: 2,
          }}
        >
          Take Me Back Home 🏠
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Or check out some cool stuff on the site—who knows, you might find your next obsession! 😎
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
