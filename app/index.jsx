import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from 'components/app';
import reducers from 'reducers';
import demo from 'containers/demo';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Demo}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
