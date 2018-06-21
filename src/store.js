import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store;