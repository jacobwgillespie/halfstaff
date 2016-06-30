import { IndexRoute, Route } from 'react-router';
import React from 'react';

import About from './containers/About';
import Home from './containers/Home';
import FlagLayout from './layouts/FlagLayout';
import Notifications from './containers/Notifications';
import Notice from './containers/Notice';

const validateNoticeID = (nextState, replace) => {
  const { id } = nextState.params;
  if (!id) replace('/');
};

export default (
  <Route path="/" component={FlagLayout}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/:id" component={Notice} onEnter={validateNoticeID} />
  </Route>
);
