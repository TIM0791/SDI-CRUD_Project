import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const appTheme = createTheme({
  palette: {
    secondary: {
      main:'#BCD5CF',
    },
    tertiary: {
      main: '#B62D17',
      contrastText: '#fff'
  },
}});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);