import React from 'react';
import { IndexRoute, Route, Router, hashHistory } from 'react-router';

import Main from '../components/Main';
import Listing from '../components/subreddit/Listing';
import Article from '../components/subreddit/Article';

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
			<Route path="/by-subreddit/:subredditId" component={Listing} />
			<Route path="/posts/:id" component={Article} />

			<IndexRoute component={Listing} />
    </Route>
  </Router>
);
