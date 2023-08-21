/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-spread */
/* eslint-disable import/prefer-default-export */
// import '@/index.css';
// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from '@/App';
// import { api } from './state/api';

// export const store = configureStore({
//   reducer: { [api.reducerPath]: api.reducer },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// setupListeners(store.dispatch);

// ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

import '@/index.css';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import { api } from './state/api';

const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
