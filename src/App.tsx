import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import LoginPage from './pages/LoginPage';
import Storage from './pages/Storage';
import FullScreenLoadingPage from './pages/FullScreenLoadingPage';
import useAuth from './hooks/useAuth';
import './FirebaseApp';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { initializing } = useAuth();

  if (initializing) {
    return <FullScreenLoadingPage />;
  }

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/storage" component={Storage} />
          <PrivateRoute path="/storage/:path+" component={Storage} />
          <Route render={() => <Redirect to="/storage" />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
