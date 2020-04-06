import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { storage } from 'firebase';
import { handleDownload } from '../modules/handleDownload';
import { useFiles } from '../hooks/useFiles';

interface MoreMenuProps extends React.Props<JSX.Element> {
  reference: storage.Reference;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ reference }) => {
  const { ref, setRef } = useFiles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      name: 'Download',
      handleClick: async () => {
        handleClose();
        await handleDownload(reference);
      },
    },
    {
      name: 'Delete',
      handleClick: async () => {
        handleClose();
        await reference.delete();
        setRef(ref!);
      },
    },
  ];

  const button = (
    <IconButton
      aria-label="more"
      aria-controls="long-menu"
      aria-haspopup="true"
      onClick={handleClick}
    >
      <MoreVertIcon />
    </IconButton>
  );

  const menu = (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      {options.map(option => (
        <MenuItem key={option.name} onClick={option.handleClick}>
          {option.name}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      {button} {menu}
    </>
  );
};

export default MoreMenu;
