import React from 'react';
import styled from 'styled-components';
import { DropzoneState } from 'react-dropzone';

interface FileTableRowProps extends React.Props<JSX.Element> {
  isSelected: boolean;
  heading?: JSX.Element;
  name: string;
  lastModified: string;
  fileSize: string;
  onClick?: Function;
  onDoubleClick?: Function;
  dropState?: DropzoneState;
  isHead?: boolean;
}

const Row = styled.div`
  :focus {
    outline: none;
  }
  width: 100%;
  height: 48px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Cell = styled.div`
  display: inline-block;
  box-sizing: border-box;
`;

const Heading = styled(Cell)`
  width: 40px;
  text-align: center;
`;

const Name = styled(Cell)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 200px);
`;

const LastModified = styled(Cell)`
  width: 120px;
`;

const FileSize = styled(Cell)`
  width: 80px;
`;

const FileTableRow: React.FC<FileTableRowProps> = ({
  key,
  isSelected,
  heading,
  name,
  lastModified,
  fileSize,
  onClick = () => {},
  onDoubleClick = () => {},
  dropState,
  isHead = false,
}) => {
  const style: React.CSSProperties = {};
  if (dropState?.isDragActive) {
    style.boxShadow = '0 0 0 2px #1967d2 inset';
    style.backgroundColor = '#e8f0fe';
  }
  if (isSelected) {
    style.backgroundColor = '#e8f0fe';
    style.color = '#1967d2';
  }
  if (isHead) {
    style.borderBottom = '2px solid lightgrey';
    style.height = 40;
  }

  return (
    <Row
      key={key}
      {...dropState?.getRootProps()}
      style={style}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={() => onDoubleClick()}
    >
      {heading && <Heading>{heading}</Heading>}
      <Name>{name}</Name>
      <LastModified>{lastModified}</LastModified>
      <FileSize>{fileSize}</FileSize>
    </Row>
  );
};

export default FileTableRow;
