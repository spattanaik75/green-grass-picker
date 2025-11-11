import { createTheme } from '@mui/material/styles';

// Pastel color palette
const pastelPalette = {
  primary: {
    main: '#a3c9c7', // pastel teal
    light: '#d0ece7',
    dark: '#6fa3a8',
    contrastText: '#2d3a3a',
  },
  secondary: {
    main: '#f7cac9', // pastel pink
    light: '#fff0f0',
    dark: '#c48b8b',
    contrastText: '#2d3a3a',
  },
  background: {
    default: '#f9f9f9',
    paper: '#ffffff',
  },
  success: {
    main: '#b7e4c7', // pastel green
    contrastText: '#2d3a3a',
  },
  error: {
    main: '#ffb3b3', // pastel red
    contrastText: '#2d3a3a',
  },
  warning: {
    main: '#ffe5b4', // pastel yellow
    contrastText: '#2d3a3a',
  },
  info: {
    main: '#b5d0ff', // pastel blue
    contrastText: '#2d3a3a',
  },
};

const theme = createTheme({
  palette: pastelPalette,
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(163, 201, 199, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(163, 201, 199, 0.15)',
          },
        },
      },
    },
  },
});

export default theme;
