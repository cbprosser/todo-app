import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './components/Entrypoint/Root';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Providers />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
