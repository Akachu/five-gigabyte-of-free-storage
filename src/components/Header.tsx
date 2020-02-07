import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import styled from "styled-components";
import FirebaseApp from "../FirebaseApp";

const Title = styled(Typography)`
  flex-grow: 1;
`;

const Header: React.FC = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    FirebaseApp.auth().signOut();
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6">Storage</Title>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
