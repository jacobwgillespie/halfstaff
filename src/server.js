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
import muiTheme from './styles/muiTheme';
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

const handleReactRequest = (req, cb) => {
  const initialState = buildInitialState();

  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore(memoryHistory, initialState);
  const history = memoryHistory;

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      cb(500, null, error.message);
      return;
    }

    if (redirectLocation) {
      cb(302, `${redirectLocation.pathname}${redirectLocation.search}`);
      return;
    }

    if (!renderProps) {
      cb(404, null, 'Not found');
      return;
    }


    const render = () => {
      const theme = getMuiTheme(muiTheme, {
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

      cb(null, null, `<!doctype html>${html}`);
    };

    Promise.all(prefetchData(renderProps, store)).then(render, render);
  });
};

export const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res) => {
  handleReactRequest(req, (code, location, content) => {
    if (location) return res.redirect(code, location);

    if (code) res.code(code).send(content);
    else res.send(content);

    return null;
  });
});

export default app;

export function staticRender(req, cb) {
  handleReactRequest(req, (code, location, content) => {
    if (code && code !== 200) {
      return cb(new Error(`Render error: ${code}`));
    }

    return cb(null, content);
  });
}
