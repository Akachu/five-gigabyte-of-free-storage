import React, { useEffect, useState } from 'react';
import { storage } from 'firebase';
import useFiles from '../../hooks/useFiles';
import { FileInfo } from '../../modules/files';
import FileRow from './FileRow';
import FolderRow from './FolderRow';
import { useDropzone } from 'react-dropzone';
import { onDrop } from '../../modules/onDrop';
import useItemList from '../../hooks/useFiles';
import styled from 'styled-components';
import FileTableRow from './FileTableRow';

const Wrapper = styled.div`
  :focus {
    outline: none;
  }
  width: 100%;
  padding: 1px;
  flex: 1 0;
`;

interface FileTableProps {
  fileList: Array<FileInfo>;
  folderList: Array<storage.Reference>;
}

const FileTable = ({ fileList, folderList }: FileTableProps) => {
  const [selected, setSelected] = useState<null | string>(null);

  function handleSelect(ref: storage.Reference) {
    return () => setSelected(ref.fullPath);
  }

  const { ref, isLoading } = useFiles();

  useEffect(() => {
    setSelected(null);
  }, [ref]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: onDrop(ref!),
  });

  const style: React.CSSProperties = {};
  if (isDragActive) {
    style.boxShadow = '0 0 0 2px #1967d2 inset';
    style.backgroundColor = '#e8f0fe';
  }

  return (
    <div
      onClick={() => setSelected(null)}
    >
      <Wrapper>
        <FileTableRow
          isSelected={false}
          lastModified={'Last modified'}
          name={'Name'}
          fileSize={'File size'}
          isHead={true}
        />
      </Wrapper>
      <Wrapper {...getRootProps()} style={style}>
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
      </Wrapper>
    </div>
  );
};

export default FileTable;
