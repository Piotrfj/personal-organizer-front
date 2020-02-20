import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import coreReducer from 'redux/reducers';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const store = createStore(
    coreReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;