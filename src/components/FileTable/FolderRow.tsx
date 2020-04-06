import React from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from 'firebase';
import { Folder as FolderIcon } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../../hooks/useFiles';
import FileTableRow from './FileTableRow';
import { onDrop } from '../../modules/onDrop';

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
  const { ref, setRef } = useFiles();
  const history = useHistory();
  function handleChangeFolder() {
    history.push(`/storage/${folder.fullPath}`);
    setRef(folder);
  }

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
        onDrop: onDrop(folder, () => setRef(ref!)),
        noDragEventsBubbling: true,
      })}
    />
  );
};

export default FolderRow;
