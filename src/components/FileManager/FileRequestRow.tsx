import React, { Key } from 'react';
import { CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import styled from 'styled-components';
import { CheckCircle as CheckCircleIcon } from '@material-ui/icons';

export interface RequestProgress {
  percent: number;
  remainTime: number;
}

interface FileRequestRowProps {
  key: Key;
  name: string;
  progress: RequestProgress;
  completed: boolean;
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
    color: #4285f4;
  }
`;

const Name = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  margin-bottom: 2px;
`;

const Caption = styled.p`
  margin: 0;
  font-size: 12px;
  color: grey;
`;

const FileRequestRow: React.FC<FileRequestRowProps> = ({
  key,
  name,
  progress,
  completed,
}) => {
  const getRemainTimeString = (time: number) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time % 3600) / 60);
    const second = Math.floor(time % 60);

    return (
      (hour > 0 ? `${hour}시간 ` : '') +
      (minute > 0 || hour > 0 ? `${minute}분` : '') +
      (time > 1800 ? '' : `${time > 60 ? ' ' : ''}${second}초`)
    );
  };

  const { percent, remainTime } = progress;
  return (
    <Wrapper key={key}>
      <NameWrapper>
        <Name>{name}</Name>
        <Caption>
          {completed ? '완료' : getRemainTimeString(remainTime)}
        </Caption>
      </NameWrapper>
      <TailWrapper>
        {completed ? (
          <CheckCircleIcon
            style={{ fontSize: 25, color: green[500], margin: '0 auto' }}
          />
        ) : (
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
              value={percent}
              thickness={5}
            />
          </ProgressWrapper>
        )}
      </TailWrapper>
    </Wrapper>
  );
};

export default FileRequestRow;
