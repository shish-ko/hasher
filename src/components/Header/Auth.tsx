import { Avatar, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAuth } from "utils/hooks";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DefaultAccIcon from '@mui/icons-material/AccountCircleOutlined';
import UserPagedIcon from '@mui/icons-material/BallotOutlined';
import LogoutOutIcon from '@mui/icons-material/LogoutOutlined';
import ProfileIcon from '@mui/icons-material/AssignmentIndOutlined';

export const Auth = () => {
  const { isLogged, name, id } = useAppSelector((store) => store.user);
  const { logOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLLIElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    isLogged ?
      <>
        <ListItem disablePadding
          sx={{ width: 'fit-content', cursor: 'pointer' }}
          // onMouseLeave={handleCloseMenu} 
          onMouseEnter={handleOpenMenu}>
          {!name ? <Avatar sx={{ mr: 1 }}>{name[0]}</Avatar> : <DefaultAccIcon sx={{ mr: 1 }} />}
          <ListItemText primaryTypographyProps={{ variant: 'appNav' }}>{name}</ListItemText>
        </ListItem>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu} autoFocus={false}>
          <MenuItem component={Link} to={`user/${id}`} onClick={handleCloseMenu}>
            <ListItemIcon>
              <UserPagedIcon />
            </ListItemIcon>
            <ListItemText>User page</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to={'#'} onClick={handleCloseMenu}>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={logOutUser}>
            <ListItemIcon>
              <LogoutOutIcon />
            </ListItemIcon>
            Log out</MenuItem>
        </Menu>
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
