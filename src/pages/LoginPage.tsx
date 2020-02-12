import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import useAuth from '../hooks/useAuth';

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

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  if (user) {
    return <Redirect to="/storage" />;
  }

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
          <BlueSpan>5 Gigabyte</BlueSpan> of
        </Typography>
        <Typography variant="h5">
          <GreySpan>free storage</GreySpan>
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
