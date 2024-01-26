import React from "react";
import { Auth } from "./Auth";
import { Link, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import logo from '../../assets/Logo.png';
import { Link as RouterLink } from "react-router-dom";

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack component={'header'} direction={'row'} padding={theme.spacing(4, 5)} height={'64px'} borderBottom={'1px solid rgba(0,0,0, 0.07)'} bgcolor='white'>
      <Stack direction='row' alignItems='center' spacing={5}>
        <img src={logo} alt="app logo" className="header__logo" />
        <Typography variant="h1">SecretService</Typography>
      </Stack>
      <List disablePadding sx={{ display: "flex", gap: theme.spacing(5), justifyContent: "flex-end", flex: '1 0 0' }}>
        <ListItem disablePadding sx={{ width: 'fit-content' }}>
          <Link component={RouterLink} to={'#'} underline="hover" variant="appNav" color={theme.typography.appNav.color}>Terms and conditions</Link>
        </ListItem>
        <ListItem disablePadding sx={{ width: 'fit-content' }}>
          <Link component={RouterLink} to={'#'} underline="hover" variant="appNav" color={theme.typography.appNav.color}>About us</Link>
        </ListItem>
        <Auth />
      </List>
    </Stack>
  );
};
