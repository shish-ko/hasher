import { createTheme, lighten } from '@mui/material';
import { COLORS } from './colors';
import type {} from '@mui/x-date-pickers/themeAugmentation';


export const appTheme = createTheme({
  spacing: 4,
  palette: {
    text: {
      secondary: '#E4E6C3',
    },
    background: {
      default: COLORS.darkBG,
    },
    secondary: {
      main: '#1b5a5e'
    },
    shareBlock: {
      main: 'orange', // check color location
      dark: 'orange'
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Archivo, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontFamily: 'Inter',
      fontWeight: 800,
      letterSpacing: "-0.15px",
      color: 'black',
    },
    h3: {
      fontFamily: 'Bowlby One',
      fontSize: '48px',
      marginBottom: '40px'
    },
    h4: {
      fontFamily: 'Bowlby One',
      fontSize: '32px',
      lineHeight: '38.4px', 
      marginBottom: '20px',
    },
    appNav: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: "-0.15px",
      lineHeight: '2rem',
      color: COLORS.appNav,
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
  components: {
    MuiCard: {
      styleOverrides:{
        root: {
          backgroundColor: lighten(COLORS.darkBG, .1)
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: 'black',
        }
      }
    },
    MuiMultiSectionDigitalClockSection:{
      styleOverrides: {
        root: {
          color: 'black',
        }
      }
    }
  }
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
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    shareBlock: Palette['primary'];
  }

  interface PaletteOptions {
    shareBlock?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    shareBlock: true;
  }
}
