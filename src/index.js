import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './store/reducers/index';

import './index.css';
import App from './App';

const initialState = {
  isLoading: false,
  jobDetails: {},
  jobSearchResults: {},
  peopleDetails: {},
  peopleSearchResults: {},
};

const store = createStore(reducer,
  initialState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
