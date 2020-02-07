import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
	height: 100vh;
`;

const FullScreenLoadingPage: React.FC = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default FullScreenLoadingPage;
