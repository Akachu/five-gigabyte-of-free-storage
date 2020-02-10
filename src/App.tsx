import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Storage from './pages/Storage';
import FullScreenLoadingPage from './pages/FullScreenLoadingPage';
import useAuth from './hooks/useAuth';
import './FirebaseApp';

const App = () => {
  const { initializing, user } = useAuth();
  let child;
  if (initializing) {
    child = <FullScreenLoadingPage />;
  } else if (!user) {
    child = <LoginPage />;
  } else {
    child = (
      <>
        <Header />
        <Storage />
      </>
    );
  }

  return (
    <div className="App">
      <CssBaseline />
      {child}
    </div>
  );
};

export default App;
