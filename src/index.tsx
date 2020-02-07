import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-roboto";
import modules, { rootSaga } from "./modules";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";


const sagaMiddleWare = createSagaMiddleware();

const store = createStore(modules, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
