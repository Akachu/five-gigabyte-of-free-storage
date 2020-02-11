import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from 'firebase';
import { TableRow, TableCell } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import useFiles from '../../hooks/useFiles';

interface FolderRowProps {
  isSelected: boolean;
  folder: storage.Reference;
  handleSelect: Function;
}

const FolderRow: React.FC<FolderRowProps> = ({
  isSelected,
  folder,
  handleSelect,
}) => {
  const { setRef } = useFiles();
  const history = useHistory();
  function handleChangeFolder() {
    history.push(`/storage/${folder.fullPath}`);
    setRef(folder);
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <TableRow
      {...getRootProps()}
      selected={isSelected}
      onClick={() => handleSelect(folder)}
      onDoubleClick={handleChangeFolder}
    >
      <TableCell>
        <input type="file" {...getInputProps()} /> {folder.name}
      </TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  );
};

export default FolderRow;
