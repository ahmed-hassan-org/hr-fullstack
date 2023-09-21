/* eslint-disable react/jsx-no-useless-fragment */
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLayoutState } from '../../../store/LayoutState';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthState } from '../../../store/AuthState';
const Hrnavbar = () => {
  const [layoutState, setLayoutState] = useRecoilState(useLayoutState);
  const authState = useRecoilValue(useAuthState);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showSideMenu = () => {
    setLayoutState((e) => ({
      ...e,
      draweOpen: true,
    }));
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuState(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuState(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => showSideMenu()}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h6" sx={{ flexGrow: 1 }}>
            Hr Application
          </Typography>
          {authState.isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={menuState}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Hrnavbar;
