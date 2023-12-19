import React from "react";
import { Auth } from "./Auth";
import { Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import logo from '../../assets/Logo.png';


export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack component={'header'} direction={'row'} padding={theme.spacing(3, 5)} alignSelf={'stretch'}>
      <Stack direction='row' alignItems='center' spacing={5}>
        <img src={logo} alt="app logo" className="header__logo"/>
        <Typography variant="h1">SecretService {theme.spacing()}</Typography>
      </Stack>
      <List disablePadding sx={{display: "flex", gap: theme.spacing(5), justifyContent: "flex-end", flex: '1 0 0'}}>
        <ListItem disablePadding>Terms and conditions</ListItem>
        <ListItem disablePadding>About us</ListItem>
        <ListItem disablePadding>Authorization</ListItem>
      </List>
      {/* <header className="app-container header">
        <div className="header__item"></div>
        <h1 className="header__item header__item_center">Hasher</h1>
        <div className="header__item header__item_right">
          <Auth/> 
        </div>
      </header> */}
    </Stack>
  );
};
