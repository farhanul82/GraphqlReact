import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import { Provider } from "react-redux";
import store from "./Redux/combinreducers";

import Layout from './components/layout/Layout'

document.title = 'TASK'

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
