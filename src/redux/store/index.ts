import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import coreReducer from 'redux/reducers';

export const store = createStore(
    coreReducer,
    // @ts-ignore
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;