import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index.js";
import "./index.css";
import App from "./App";
import {createBrowserHistory} from 'history';

let store = createStore(reducer, applyMiddleware(thunk));
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
