import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f4f4',
      paper: '#ffffea',
    },
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
      disabled: '#9e9e9e',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(0, 0, 0, 0.14)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 400 },
    h6: { fontSize: '1rem', fontWeight: 700 },
    button: { textTransform: 'none' },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.2)",
    "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "0px 3px 6px rgba(0, 0, 0, 0.2)",
    "0px 4px 8px rgba(0, 0, 0, 0.2)",
    "0px 5px 10px rgba(0, 0, 0, 0.2)",
    "0px 6px 12px rgba(0, 0, 0, 0.2)",
    "0px 7px 14px rgba(0, 0, 0, 0.2)",
    "0px 8px 16px rgba(0, 0, 0, 0.2)",
    "0px 9px 18px rgba(0, 0, 0, 0.2)",
    "0px 10px 20px rgba(0, 0, 0, 0.2)",
    "0px 11px 22px rgba(0, 0, 0, 0.2)",
    "0px 12px 24px rgba(0, 0, 0, 0.2)",
    "0px 13px 26px rgba(0, 0, 0, 0.2)",
    "0px 14px 28px rgba(0, 0, 0, 0.2)",
    "0px 15px 30px rgba(0, 0, 0, 0.2)",
    "0px 16px 32px rgba(0, 0, 0, 0.2)",
    "0px 17px 34px rgba(0, 0, 0, 0.2)",
    "0px 18px 36px rgba(0, 0, 0, 0.2)",
    "0px 19px 38px rgba(0, 0, 0, 0.2)",
    "0px 20px 40px rgba(0, 0, 0, 0.2)",
    "0px 21px 42px rgba(0, 0, 0, 0.2)",
    "0px 22px 44px rgba(0, 0, 0, 0.2)",
    "0px 23px 46px rgba(0, 0, 0, 0.2)",
    "0px 24px 48px rgba(0, 0, 0, 0.2)",
  ] as const,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            filter: 'brightness(90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: 12,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
});

export default theme;
