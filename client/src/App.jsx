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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MUIThemeProvider>
  );
};

export default App;
