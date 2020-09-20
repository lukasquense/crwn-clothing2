import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger]; //its written this way because afterwards we are gona have more middlewares.

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;