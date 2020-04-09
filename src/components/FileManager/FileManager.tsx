import React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { useFileManager } from '../../hooks/useFileManager';
import FileUploadRow from './FileUploadRow';
import { FileRequestType } from '../../modules/fileManager';
import FileDownloadRow from './FileDownloadRow';

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

const FileManager: React.FC = () => {
  const { requests } = useFileManager();
  if (!requests.length) {
    return <div />;
  }

  const list = requests.sort((a, b) => (a.time > b.time ? -1 : 1));

  return (
    <Wrapper>
      <div>
        {list.map((info) =>
          info.type === FileRequestType.DOWNLOAD ? (
            <FileDownloadRow key={info.key} info={info} />
          ) : (
            <FileUploadRow key={info.key} info={info} />
          ),
        )}
      </div>
    </Wrapper>
  );
};

export default FileManager;
