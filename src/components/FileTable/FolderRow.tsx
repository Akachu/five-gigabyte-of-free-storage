import React from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from 'firebase';
import { Folder as FolderIcon } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../../hooks/useFiles';
import FileTableRow from './FileTableRow';
import { useFileManager } from '../../hooks/useFileManager';

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
  const { uploadFile } = useFileManager();
  const history = useHistory();
  function handleChangeFolder() {
    history.push(`/storage/${folder.fullPath}`);
    setRef(folder);
  }

  const onDrop = (acceptedFiles: File[]) =>
    acceptedFiles.forEach((file) => {
      uploadFile(folder, file);
    });

  return (
    <FileTableRow
      onClick={handleSelect(folder)}
      onDoubleClick={handleChangeFolder}
      isSelected={isSelected}
      heading={<FolderIcon />}
      name={folder.name}
      lastModified="-"
      fileSize="-"
      dropState={useDropzone({
        onDrop,
        noDragEventsBubbling: true,
      })}
    />
  );
};

export default FolderRow;
