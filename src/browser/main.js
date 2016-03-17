import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import cs from 'react-intl/locale-data/cs';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import ro from 'react-intl/locale-data/ro';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData } from 'react-intl';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

// github.com/yahoo/react-intl/wiki/Upgrade-Guide#add-call-to-addlocaledata-in-browser
[cs, en, fr, ro].forEach(addLocaleData);

const store = configureStore({
  createEngine,
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
