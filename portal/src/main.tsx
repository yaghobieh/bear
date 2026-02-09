import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import App from './App';
import '@forgedevstack/bear/styles.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider 
      defaultMode="light"
      customVariants={{
        brand: { bg: '#ec4899', bgHover: '#db2777', text: '#ffffff' },
        ocean: { bg: '#0ea5e9', bgHover: '#0284c7', text: '#ffffff' },
        forest: { bg: '#22c55e', bgHover: '#16a34a', text: '#ffffff' },
        sunset: { bg: '#f97316', bgHover: '#ea580c', text: '#ffffff' },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BearProvider>
  </React.StrictMode>
);

