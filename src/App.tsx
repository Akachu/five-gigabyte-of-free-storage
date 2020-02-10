import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Storage from './pages/Storage';
import FullScreenLoadingPage from './pages/FullScreenLoadingPage';
import useAuth from './hooks/useAuth';
import './FirebaseApp';

const App = () => {
  const { initializing, user } = useAuth();
  // let child;
  // if (initializing) {
  //   child = <FullScreenLoadingPage />;
  // } else (!user) {
  //   child = <LoginPage />;
  // }

  return (
    <div className="App">
      <CssBaseline />
      {/* {child} */}
      <Router>
        <Route path="/login" component={LoginPage} />
        <Route path="/storage" component={Storage} />
      </Router>
    </div>
  );
};

export default App;
