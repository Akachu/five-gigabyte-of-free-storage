import React, { useEffect } from 'react';
import firebaseApp from '../FirebaseApp';

const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebaseApp.auth().currentUser;
    return { initializing: !user, user };
  });

  function onChange(user: firebase.User | null) {
    setState({ initializing: false, user });
  }

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(onChange);

    return () => unsubscribe();
  }, []);

  return state;
};

export default useAuth;
