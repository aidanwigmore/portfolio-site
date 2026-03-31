import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Box>
        <App />
      </Box>
    </BrowserRouter>
  </React.StrictMode>
);
