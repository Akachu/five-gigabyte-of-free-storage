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
    const unit = ['', 'K', 'M', 'G', 'T', 'P'];
    while (1024 ** pow < byte) {
      pow++;
    }

    pow -= 1;

    const size = Math.floor(byte / 1024 ** pow);

    return `${size}${unit[pow]}B`;
  };

  async function handleDownload() {
    const url = await file.ref.getDownloadURL();
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', file.ref.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <FileTableRow
      isSelected={isSelected}
      name={file.name}
      lastModified={file.createdAt.toLocaleString()}
      fileSize={getSizeString(file.size)}
      onClick={handleSelect(file.ref)}
      onDoubleClick={() => handleDownload()}
    />
  );
};

export default FileRow;
