import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './components/Entrypoint/Providers';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers />{' '}
    </Provider>
  </React.StrictMode>
);
