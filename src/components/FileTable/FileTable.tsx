import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import useFiles from '../../hooks/useFiles';
import { FileInfo } from '../../modules/files';
import { storage } from 'firebase';
import FileRow from './FileRow';
import FolderRow from './FolderRow';

interface FileTableProps {
  fileList: Array<FileInfo>;
  folderList: Array<storage.Reference>;
}

const FileTable: React.FC<FileTableProps> = ({ fileList, folderList }) => {
  function handleSelect(ref: storage.Reference) {
    setSelected(ref.fullPath);
  }

  const [selected, setSelected] = useState<null | string>(null);

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
        {/* {ref.parent && (
        <File isToParent={true} isFolder={true} fileRef={ref.parent} />
      )} */}

        {folderList.map((folder, i) => (
          <FolderRow
            key={i}
            isSelected={selected == folder.fullPath}
            folder={folder}
            handleSelect={handleSelect}
          />
        ))}

        {fileList?.map((fileInfo, i) => (
          <FileRow
            key={i}
            isSelected={selected == fileInfo.ref.fullPath}
            file={fileInfo}
            handleSelect={handleSelect}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;
