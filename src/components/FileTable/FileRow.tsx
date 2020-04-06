import React from 'react';
import FileTableRow from './FileTableRow';
import { FileInfo } from '../../modules/files';
import { handleDownload } from '../../modules/handleDownload';

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

  return (
    <FileTableRow
      isSelected={isSelected}
      name={file.name}
      lastModified={file.createdAt.toLocaleDateString()}
      fileSize={getSizeString(file.size)}
      onClick={handleSelect(file.ref)}
      onDoubleClick={() => handleDownload(file.ref)}
    />
  );
};

export default FileRow;
