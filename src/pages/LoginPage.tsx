import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Typography,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { auth } from 'firebase';
import GoogleLoginButton from '../components/GoogleLoginButton';
import SizedBox from '../components/SizedBox';
import firebase from '../FirebaseApp';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: 1;
  }
`;

const LoginForm = styled(Paper)`
  width: 300px;
  min-width: 300px;
  padding: 24px;
  text-align: center;
`;

const BlueSpan = styled.span`
  color: #2962ff;
`;
const GreySpan = styled.span`
  color: #424242;
`;

const LoginPage: React.FC = props => {
  const [loading, setLoading] = React.useState(false);

  const provider = new auth.GoogleAuthProvider();
  provider.addScope('email');

  const handleLogin = async () => {
    setLoading(true);
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <LoginForm variant="outlined" component="div">
        <Typography variant="h5">
          <BlueSpan>5G</BlueSpan>
          <GreySpan>oFS</GreySpan>
        </Typography>
        <SizedBox height={4} />
        <Typography variant="h5">sign in</Typography>
        <SizedBox height={12} />
        <GoogleLoginButton onClick={handleLogin} />
      </LoginForm>
    </Wrapper>
  );
};

export default LoginPage;
