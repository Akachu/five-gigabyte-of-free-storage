import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import googleLogo from '../assets/g-logo.png';

const SizedImg = styled.img`
  width: 22px;
  height: 22px;
`;

const ButtonTextWrapper = styled.span`
  font-size: 16px;
  text-transform: none;
  margin: 0 20px;
`;

const StyledButton = styled(Button)`
  && {
    height: 40px;
    color: rgba(0, 0, 0, 0.54);
    padding: 0 10px;
    background-color: white;
  }
`;

interface GoogleLoginButtonProps {
  onClick: Function;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={() => onClick()}>
      <SizedImg src={googleLogo} />
      <ButtonTextWrapper>Sign in with Google</ButtonTextWrapper>
    </StyledButton>
  );
};

export default GoogleLoginButton;
