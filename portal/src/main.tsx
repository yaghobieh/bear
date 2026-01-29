import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import App from './App';
import '@forgedevstack/bear/styles.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider defaultMode="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BearProvider>
  </React.StrictMode>
);

