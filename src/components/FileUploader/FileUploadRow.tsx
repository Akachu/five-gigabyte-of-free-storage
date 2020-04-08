import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import styled from 'styled-components';
import { CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { FileUploadInfo } from '../../modules/fileUpload';
import { useFileUpload } from '../../hooks/useFileUpload';

interface FileUploadRowProps {
  fileInfo: FileUploadInfo;
  upload?: boolean;
}

const Wrapper = styled.div`
  padding: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const ChildWrapper = styled.div`
  display: inline-block;
`;

const NameWrapper = styled(ChildWrapper)`
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TailWrapper = styled(ChildWrapper)`
  width: 40px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const ProgressWrapper = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  margin: 0 auto;
  .Top {
    position: absolute;
    left: 0;
    color: #eef3fd;
  }
  .Bottom {
    color: #6798e5;
  }
`;

const FileUploadRow: React.FC<FileUploadRowProps> = ({
  fileInfo,
  upload = false,
}) => {
  const { file, ref, key } = fileInfo;
  const [uploadPercent, setUploadPercent] = useState(upload ? 0 : 100);
  const { completeUploadFile } = useFileUpload();

  useEffect(() => {
    if (!upload || key === undefined) return;
    const folder = ref.child(file.name);
    const task = folder.put(file);
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadPercent(progress);
    });

    task.then(() => {
      completeUploadFile(key);
    });
  }, []);

  return (
    <Wrapper key={key}>
      <NameWrapper>{file.name}</NameWrapper>
      <TailWrapper>
        {upload ? (
          <ProgressWrapper>
            <CircularProgress
              size={24}
              className="Top"
              variant="static"
              value={100}
              thickness={5}
            />
            <CircularProgress
              size={24}
              className="Bottom"
              variant="static"
              value={uploadPercent}
              thickness={5}
            />
          </ProgressWrapper>
        ) : (
          <CheckCircleIcon
            style={{ fontSize: 25, color: green[500], margin: '0 auto' }}
          />
        )}
      </TailWrapper>
    </Wrapper>
  );
};

export default FileUploadRow;
