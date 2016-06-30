import './styles/base.scss';
// import './utils/performance';

import { applyRouterMiddleware, browserHistory, match, Router } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import useScroll from 'react-router-scroll';

import { configureStore } from './redux/store';
import muiTheme from './styles/muiTheme';
import routes from './routes';

const start = () => {
  injectTapEventPlugin();

  const store = configureStore(browserHistory, window.INITIAL_STATE);

  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    render(
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Provider store={store}>
          <Router
            {...renderProps}
            render={applyRouterMiddleware(useScroll())}
          />
        </Provider>
      </MuiThemeProvider>,
      document.getElementById('react')
    );
  });

  document.body.className += ' app-ready';
};

window.onPolyfilled(start);
