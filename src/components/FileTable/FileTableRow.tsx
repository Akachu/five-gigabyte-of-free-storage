import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

interface FileTableRowProps {
  isSelected: boolean;
  name: string;
  lastModified: string;
  fileSize: string;
  onClick: Function;
  onDoubleClick: Function;
}

const FileTableRow: React.FC<FileTableRowProps> = ({
  isSelected,
  name,
  lastModified,
  fileSize,
  onClick,
  onDoubleClick,
}) => {
  return (
    <TableRow
      selected={isSelected}
      onClick={() => onClick()}
      onDoubleClick={() => onDoubleClick()}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{lastModified}</TableCell>
      <TableCell>{fileSize}</TableCell>
    </TableRow>
  );
};

export default FileTableRow;
