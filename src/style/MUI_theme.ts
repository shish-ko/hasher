import { createTheme } from '@mui/material';
export const appTheme = createTheme({
  spacing: 4,
  
  typography: {
    htmlFontSize: 10,
    h1: {
      fontSize: '24px',
      
      fontFamily: 'Inter',
      fontWeight: 800,
      letterSpacing: "-0.15px"
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      // small
      sm: 600,
      // medium
      md: 900,
      // large
      lg: 1200,
      // extra-large
      xl: 1200,
    }
  },
});
