import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './components/Entrypoint/Providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
