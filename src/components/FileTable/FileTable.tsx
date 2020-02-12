import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { storage } from 'firebase';
import useFiles from '../../hooks/useFiles';
import { FileInfo } from '../../modules/files';
import FileRow from './FileRow';
import FolderRow from './FolderRow';

interface FileTableProps {
  fileList: Array<FileInfo>;
  folderList: Array<storage.Reference>;
}

const FileTable = ({ fileList, folderList }: FileTableProps) => {
  const [selected, setSelected] = useState<null | string>(null);

  function handleSelect(ref: storage.Reference) {
    setSelected(ref.fullPath);
  }

  const { ref } = useFiles();

  useEffect(() => {
    setSelected(null);
  }, [ref]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Last modified</TableCell>
          <TableCell>File size</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {folderList.map(folder => (
          <FolderRow
            key={folder.fullPath}
            isSelected={selected === folder.fullPath}
            folder={folder}
            handleSelect={handleSelect}
          />
        ))}

        {fileList.map(fileInfo => (
          <FileRow
            key={fileInfo.ref.fullPath}
            isSelected={selected === fileInfo.ref.fullPath}
            file={fileInfo}
            handleSelect={handleSelect}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;
