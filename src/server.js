import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import express from 'express';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import path from 'path';
import React from 'react';

import { configureStore } from './redux/store';
import Html from './components/Html';
import routes from './routes';

import assets from '../dist/assets.json';
import icons from '../dist/icons.json';

import recent from '../data/recent.json';

const buildInitialState = () => {
  const initialState = {
    notices: {
      recent: [],
      store: {},
    },
  };

  recent.forEach(notice => {
    initialState.notices.recent.push(notice.id);
    initialState.notices.store[notice.id] = notice;
  });

  return initialState;
};

const assetHost = process.env.ASSET_HOST || '';

const prefetchData = (renderProps, store) => {
  const { components, params } = renderProps;
  const { getState, dispatch } = store;

  return components
    .filter(component => component)
    .filter(component => component.fetchData)
    .map(component => component.fetchData)
    .map(fetchData => fetchData(getState(), dispatch, params));
};

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res) => {
  const initialState = buildInitialState();

  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore(memoryHistory, initialState);
  const history = memoryHistory;

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
      return;
    }

    if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
      return;
    }

    if (!renderProps) {
      res.status(404).send('Not found');
      return;
    }

    const render = () => {
      const theme = getMuiTheme({}, {
        userAgent: req.headers['user-agent'],
      });

      const content = renderToString(
        <Provider store={store}>
          <MuiThemeProvider muiTheme={theme}>
            <RouterContext {...renderProps} />
          </MuiThemeProvider>
        </Provider>,
      );

      const head = Helmet.rewind();

      const html = renderToStaticMarkup(
        <Html
          assetHost={assetHost}
          assets={assets}
          body={content}
          head={head}
          icons={icons}
          store={store}
        />
      );

      res.send(`<!doctype html>${html}`);
    };

    Promise.all(prefetchData(renderProps, store)).then(render, render);
  });
});

export default app;
