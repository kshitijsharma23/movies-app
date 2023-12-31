import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@src/store';

import ThemeProvider from '@context/ThemeContext/ThemeProvider';

import { worker } from '@mocks/browser';

import App from './App';

import './index.scss';

if (process.env.NODE_ENV === 'development') {
  void worker.start();
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
}
