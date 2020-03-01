import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import ImageEditor from './views/ImageEditor';

const AllRoutes = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/image-editor" component={ImageEditor} />
      </Switch>
    </Router>
  </Provider>
);

export default AllRoutes;
