import { createStore } from 'redux';
import coreReducer from 'reducers';

export const store = createStore(
    coreReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;