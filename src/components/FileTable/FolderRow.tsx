import React, { useCallback, useState } from 'react';
import { storage } from 'firebase';
import { TableRow, TableCell } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import FileTableRow from './FileTableRow';
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
  function handleChangeFolder() {
    setRef(folder);
  }

  const [a, seta] = useState();

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
