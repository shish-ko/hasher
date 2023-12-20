import { ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAuth } from "utils/hooks";
import { Button } from "~comps/UI_components/Button/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const Auth = () => {
  const { isLogin, name, id } = useAppSelector((store) => store.user);
  const { logOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLLIElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    isLogin ?
      <>
        <ListItem disablePadding sx={{ width: 'fit-content' }}>
          <ListItemAvatar>{name[0]}</ListItemAvatar>
          <ListItemText><Typography variant="appNav">{name}</Typography></ListItemText>
        </ListItem>
      </> :
      <>
        <ListItem disablePadding sx={{ width: 'fit-content', cursor: 'pointer' }} onClick={handleOpenMenu}>
          <ListItemText primary='Authorization' primaryTypographyProps={{ variant: 'appNav' }} />
          <ListItemIcon sx={{ minWidth: 'fit-content' }}>{anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</ListItemIcon>
        </ListItem>
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleCloseMenu} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <MenuItem onClick={handleCloseMenu}>
            <Link to={'/login'}><Typography variant="appNav">Log in</Typography></Link>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Link to={'/signup'}><Typography variant="appNav">Sign up</Typography></Link>
          </MenuItem>
        </Menu>
      </>
  );
};
