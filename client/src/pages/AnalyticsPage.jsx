import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import axiosInstance from '../utilities/axiosInstance';
import Header from '../components/Header'; // Assuming you have a Header component
import Sidebar from '../components/SideBar'; // Assuming you have a Sidebar component
import { Bar, Pie, Line } from 'react-chartjs-2'; // Assuming you have react-chartjs-2 installed
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axiosInstance.get('/analytics');
        console.log(response.data);
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching analytics');
        setLoading(false);
      }
    };


    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar sx={{
          width: '15%',
          bgcolor: 'background.default',
          borderRight: `1px solid #e0e0e0`,
          padding: 2,
        }} />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Analytics Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Movies Watched</Typography>
                <Typography variant="h4">{analytics.totalMoviesWatched}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Watch Time (minutes)</Typography>
                <Typography variant="h4">{analytics.totalWatchTime}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Average Movie Length Watched (minutes)</Typography>
                <Typography variant="h4">{analytics.avgMovieLength}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Oldest Movie Watched</Typography>
                {analytics.oldestMovieWatched && analytics.oldestMovieWatched.length > 0 && (
                  <>
                    <Typography variant="h4">{analytics.oldestMovieWatched[0].title}</Typography>
                    <Typography variant="subtitle1">{new Date(analytics.oldestMovieWatched[0].release_date).toLocaleDateString()}</Typography>
                  </>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Newest Movie Watched</Typography>
                {analytics.newestMovieWatched && analytics.newestMovieWatched.length > 0 && (
                  <>
                    <Typography variant="h4">{analytics.newestMovieWatched[0].title}</Typography>
                    <Typography variant="subtitle1">{new Date(analytics.newestMovieWatched[0].release_date).toLocaleDateString()}</Typography>
                  </>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Longest Movie Watched</Typography>
                {analytics.longestMovieWatched && analytics.longestMovieWatched.length > 0 && (
                  <>
                    <Typography variant="h4">{analytics.longestMovieWatched[0].title}</Typography>
                    <Typography variant="subtitle1">{analytics.longestMovieWatched[0].runtime} minutes</Typography>
                  </>
                )}
              </Paper>
            </Grid>



            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6">Most Watched Genre</Typography>
                {analytics.mostWatchedGenres && analytics.mostWatchedGenres.length > 0 && (
                  <Bar
                    data={{
                      labels: analytics.mostWatchedGenres[0].map(genre => genre.genre),
                      datasets: [{
                        label: 'Watch Count',
                        data: analytics.mostWatchedGenres[0].map(genre => genre.watch_count),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6">Least Watched Genre</Typography>
                {analytics.leastWatchedGenres && analytics.leastWatchedGenres.length > 0 && (
                  <Bar
                    data={{
                      labels: analytics.leastWatchedGenres[0].map(genre => genre.genre),
                      datasets: [{
                        label: 'Watch Count',
                        data: analytics.leastWatchedGenres[0].map(genre => genre.watch_count),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6">Most Watched Production Company</Typography>
                {analytics.mostWatchedProductionCompanies && analytics.mostWatchedProductionCompanies.length > 0 && (
                  <Pie
                    data={{
                      labels: analytics.mostWatchedProductionCompanies[0].map(company => company.company),
                      datasets: [{
                        label: 'Watch Count',
                        data: analytics.mostWatchedProductionCompanies[0].map(company => company.watch_count),
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)',
                        ],
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6">Most Watched Country of Production</Typography>
                {analytics.mostWatchedCountries && analytics.mostWatchedCountries.length > 0 && (
                  <Pie
                    data={{
                      labels: analytics.mostWatchedCountries[0].map(country => country.country),
                      datasets: [{
                        label: 'Watch Count',
                        data: analytics.mostWatchedCountries[0].map(country => country.watch_count),
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)',
                        ],
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </Paper>
            </Grid>


            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6">Movies Watched by Month in the Last Year</Typography>
                {analytics.moviesWatchedByMonth.length > 0 && (
                  <Line
                    data={{
                      labels: analytics.moviesWatchedByMonth.map(item => item.month),
                      datasets: [{
                        label: 'Movies Watched',
                        data: analytics.moviesWatchedByMonth.map(item => item.movies_watched),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AnalyticsPage;