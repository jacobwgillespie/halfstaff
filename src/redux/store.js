import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as currentlyLowered } from './modules/currentlyLowered';
import { reducer as notices } from './modules/notices';
import { reducer as pageLowered } from './modules/pageLowered';

const rootReducer = combineReducers({
  currentlyLowered,
  notices,
  pageLowered,
});

export function configureStore(history, initialState = {}) {
  const middleware = [thunk];
  const enhancers = [];

  if (typeof window !== 'undefined' && DEV) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  return store;
}
