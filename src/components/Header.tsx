import React, { useState, MouseEvent } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  CreateNewFolder as CreateNewFolderIcon,
} from '@material-ui/icons';
import styled from 'styled-components';
import FirebaseApp from '../FirebaseApp';

const Title = styled(Typography)`
  flex-grow: 1;
`;

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNewFolder, setOpenNewFolder] = React.useState<boolean>(false);
  const [folderName, setFolderName] = React.useState('');

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenNewFolder = () => {
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    setFolderName('');
    setOpenNewFolder(false);
  };

  const handleCreateNewFolder = () => {
    console.log(folderName);
    // TODO: 폴더 생성
    handleCloseNewFolder();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    FirebaseApp.auth().signOut();
    handleClose();
  };

  const handleChangeFolderName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFolderName(event.target.value);
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
          onClick={handleOpenNewFolder}
          color="inherit"
        >
          <CreateNewFolderIcon />
        </IconButton>
        <Dialog
          open={openNewFolder}
          onClose={handleCloseNewFolder}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Folder</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChangeFolderName}
              autoFocus
              margin="dense"
              id="name"
              label="Folder Name"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewFolder} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateNewFolder} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
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
