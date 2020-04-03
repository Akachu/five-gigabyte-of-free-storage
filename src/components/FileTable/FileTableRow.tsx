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
  height: 40px;
  padding: 5px;
`;

const Cell = styled.div`
  vertical-align: middle;
  display: inline-block;
  height: 100%;
  padding: 5px;
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
  width: calc(100% - 300px);
`;

const LastModified = styled(Cell)`
  width: 160px;
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
    style.borderBottom = "2px solid lightgrey";
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
