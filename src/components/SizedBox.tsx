import React from 'react';
import styled from 'styled-components';

interface SizedBoxProps {
  width?: number;
  height?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({
  width = 0,
  height = 0,
  children,
}) => {
  const Box = styled.div`
    width: ${width}px;
    height: ${height}px;
  `;

  return <Box>{children}</Box>;
};

export default SizedBox;
