import React from 'react';
import { storage } from 'firebase';
import useFiles from '../hooks/useFiles';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
} from '@material-ui/icons/';

interface FileProps {
  fileRef: storage.Reference;
  isFolder?: boolean;
  isToParent?: boolean;
}

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin: 10px;
`;

const File: React.FC<FileProps> = ({
  fileRef,
  isFolder = false,
  isToParent = false,
}) => {
  const { setRef } = useFiles();
  if (fileRef) {
    return (
      <StyledPaper
        onClick={() => {
          if (isFolder) setRef(fileRef);
        }}
      >
        {isToParent ? (
          <FolderOpenIcon />
        ) : isFolder ? (
          <FolderIcon />
        ) : (
          undefined
        )}
        {isToParent ? '../' : fileRef.name}
      </StyledPaper>
    );
  } else {
    return <div>{'wtf is undefined'}</div>;
  }
};

export default File;
