import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { storage } from 'firebase';
import { useFiles } from '../hooks/useFiles';
import { useSelectedRef } from '../hooks/useSelectedRef';
import { useFileManager } from '../hooks/useFileManager';

interface MoreMenuProps extends React.Props<JSX.Element> {
  reference: storage.Reference;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ reference }) => {
  const { refresh } = useFiles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { downloadFile } = useFileManager();

  const { setSelectedRef } = useSelectedRef();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFolder = async (ref: storage.Reference) => {
    const { items, prefixes } = await ref.listAll();

    await Promise.all(items.map((fileRef) => fileRef.delete()));
    await Promise.all(prefixes.map((folderRef) => deleteFolder(folderRef)));
  };

  const options = [
    {
      name: 'Download',
      handleClick: async () => {
        handleClose();
        await downloadFile(reference);
      },
    },
    {
      name: 'Delete',
      handleClick: async () => {
        handleClose();
        await deleteFolder(reference);
        setSelectedRef(null);
        refresh();
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
      {options.map((option) => (
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
