import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import MyTheme from "./Theme";

import { createStore } from "redux";
import Reducers from "./redux/allReducers";
import { Provider } from "react-redux";
import "./Fonts.css";


export let store = createStore(
  Reducers,
  // remove this before deploying to production
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MyTheme>
          <CssBaseline />
          <App />
        </MyTheme>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
