import React from 'react';
import axios from 'axios';
import FileTableRow from './FileTableRow';
import { FileInfo } from '../../modules/files';

interface FileRowProps {
  isSelected: boolean;
  file: FileInfo;
  handleSelect: Function;
}

const FileRow: React.FC<FileRowProps> = ({
  isSelected,
  file,
  handleSelect,
}) => {
  const getSizeString = (byte: number) => {
    let pow = 1;
    let unit = ['', 'K', 'M', 'G', 'T', 'P'];
    while (true) {
      if (Math.pow(1024, pow) > byte) break;
      pow++;
    }

    pow = pow - 1;

    let size = Math.floor(byte / Math.pow(1024, pow));

    return `${size}${unit[pow]}B`;
  };

  return (
    <FileTableRow
      isSelected={isSelected}
      name={file.name}
      lastModified={file.createdAt.toLocaleString()}
      fileSize={getSizeString(file.size)}
      onClick={() => handleSelect(file.ref)}
      onDoubleClick={() => {
        console.log(file.ref);
        file.ref.getDownloadURL().then(url => {
          axios({
            url,
            method: 'GET',
            responseType: 'blob',
          }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.ref.name);
            document.body.appendChild(link);
            link.click();
          });
          // file.ref.
        });
      }}
    />
  );
};

export default FileRow;
