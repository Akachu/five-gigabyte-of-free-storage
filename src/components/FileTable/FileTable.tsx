import React, { useEffect } from 'react';
import { storage } from 'firebase';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useFiles } from '../../hooks/useFiles';
import { FileInfo } from '../../modules/files';
import FileRow from './FileRow';
import FolderRow from './FolderRow';
import FileTableRow from './FileTableRow';
import { useSelectedRef } from '../../hooks/useSelectedRef';
import { useFileUpload } from '../../hooks/useFileUpload';

const Wrapper = styled.div`
  width: 100%;
  flex: 1 0;
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  :focus {
    outline: none;
  }
  width: 100%;
  padding: 1px;
`;

interface FileTableProps {
  fileList: Array<FileInfo>;
  folderList: Array<storage.Reference>;
}

const FileTable = ({ fileList, folderList }: FileTableProps) => {
  const { selectedRef, setSelectedRef } = useSelectedRef();
  const { uploadFile } = useFileUpload();

  function handleSelect(ref: storage.Reference) {
    return () => setSelectedRef(ref);
  }

  const { ref } = useFiles();

  useEffect(() => {
    setSelectedRef(null);
  }, [ref]);

  const onDrop = (acceptedFiles: File[]) =>
    acceptedFiles.forEach((file) => {
      uploadFile(ref!, file);
    });

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });

  const style: React.CSSProperties = {
    flex: '1 0',
  };
  if (isDragActive) {
    style.boxShadow = '0 0 0 2px #1967d2 inset';
    style.backgroundColor = '#e8f0fe';
  }

  return (
    <Wrapper onClick={() => setSelectedRef(null)}>
      <RowWrapper>
        <FileTableRow
          isSelected={false}
          lastModified="Last modified"
          name="Name"
          fileSize="File size"
          isHead
        />
      </RowWrapper>
      <RowWrapper {...getRootProps()} style={style}>
        {folderList.map((folder) => (
          <FolderRow
            key={folder.fullPath}
            isSelected={selectedRef?.fullPath === folder.fullPath}
            folder={folder}
            handleSelect={handleSelect}
          />
        ))}

        {fileList.map((fileInfo) => (
          <FileRow
            key={fileInfo.ref.fullPath}
            isSelected={selectedRef?.fullPath === fileInfo.ref.fullPath}
            file={fileInfo}
            handleSelect={handleSelect}
          />
        ))}
      </RowWrapper>
    </Wrapper>
  );
};

export default FileTable;
