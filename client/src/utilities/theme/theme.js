import { createTheme } from '@mui/material/styles';
import '@fontsource/orbitron'; // Importing custom font

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0abab5',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif', // Custom font
    h5: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0abab5',
      contrastText: '#000',
    },
    background: {
      default: '#121212',
      paper: '#1c1c1c',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif', // Custom font
    h5: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
    },
  },
});
