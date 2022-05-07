import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export default function configureStore() {
    const store = createStore(combineReducers, applyMiddleware(...middleware));
    sagaMiddleware.run(rootSaga);
    return store;
}