import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider, useTheme } from './utilities/theme/ThemeContext';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './utilities/theme/theme';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './utilities/PrivateRoute'; // Import the PrivateRoute component
import MoviePage from './pages/MoviePage';
import Watchlist from './pages/Watchlist';
import Favorites from './pages/Favorites';
import ReviewPage from './pages/ReviewPage';
import SearchResultPage from './pages/SearchResultPage';
import MovieReviewPage from './pages/MovieReviewPage';
import RecommendationPage from './pages/RecommendationPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const MainApp = () => {
  const { isDarkMode } = useTheme(); // Access the current theme from context
  
  return (
    <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>

          {/*PublicRoute */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/*PrivateRoute */}
          <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/movie/:id" element={<PrivateRoute element={<MoviePage />} />} />
          <Route path="/movie/:id/reviews" element={<PrivateRoute element={<MovieReviewPage />} />} />
          <Route path="/watchlist" element={<PrivateRoute element={<Watchlist />} />} />
          <Route path="/favourites" element={<PrivateRoute element={<Favorites />} />} />
          <Route path="/reviews" element={<PrivateRoute element={<ReviewPage />} />} />
          <Route path="/search" element={<PrivateRoute element={<SearchResultPage />} />} />
          <Route path="/analytics" element={<PrivateRoute element={<AnalyticsPage />} />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MUIThemeProvider>
  );
};

export default App;
