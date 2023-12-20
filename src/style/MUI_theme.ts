import { createTheme } from '@mui/material';
import { COLORS } from './colors';

export const appTheme = createTheme({
  spacing: 4,

  typography: {
    htmlFontSize: 10,
    fontFamily: 'Archivo, sans-serif',
    h1: {
      fontSize: '2.5rem',      
      fontFamily: 'Inter',
      fontWeight: 800,
      letterSpacing: "-0.15px"
    },
    appNav: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: "-0.15px",
      lineHeight: '2rem',
      color: COLORS.appNav,
    }
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

declare module '@mui/material/styles' {
  interface TypographyVariants {
    appNav: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    appNav?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    appNav: true;
    h3: false;
  }
}