import React from 'react';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
    <ToastContainer />
  </>,
  document.getElementById('app')
);
