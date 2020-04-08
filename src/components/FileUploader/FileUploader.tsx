import React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { useFileUpload } from '../../hooks/useFileUpload';
import FileUploadRow from './FileUploadRow';

const Wrapper = styled(Paper)`
  padding: 10px;
  width: 300px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 30px;
  box-sizing: border-box;
  translate: 0.3s;
  @media screen and (max-width: 360px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: calc(100% - 20px);
    margin: 10px;
  }
`;

const FileUploader: React.FC = () => {
  const { uploading, completed } = useFileUpload();
  if (!uploading.length && !completed.length) {
    return <div />;
  }

  return (
    <Wrapper>
      <div>
        {uploading.map((info) => (
          <FileUploadRow key={info.key} fileInfo={info} upload />
        ))}
      </div>
      {uploading.length !== 0 && completed.length !== 0 && (
        <hr style={{ border: '0.5px solid lightgrey' }} />
      )}
      <div>
        {completed.map((info) => (
          <FileUploadRow key={info.key} fileInfo={info} />
        ))}
      </div>
    </Wrapper>
  );
};

export default FileUploader;
