import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  component: React.ElementType;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({
  component: Component,
  path,
  exact,
}: PrivateRouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
