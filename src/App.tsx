import React from "react";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Storage from "./components/Storage";

import { useAuth } from "./hooks/useAuth";
import "./FirebaseApp";
import { CssBaseline } from "@material-ui/core";
import FullScreenLoadingPage from "./pages/FullScreenLoadingPage";

const App = () => {
  const { initializing, user } = useAuth();

  return (
    <div className="App">
      <CssBaseline />

      {initializing ? (
        <FullScreenLoadingPage />
      ) : !user ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          <Storage />
        </>
      )}
    </div>
  );
};

export default App;
