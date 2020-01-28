import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import './scss/App.scss';
import AppRouter from './router/AppRouter';

const App = () =>
  <Provider store={store}>
    <AppRouter />
  </Provider>;

export default App;
