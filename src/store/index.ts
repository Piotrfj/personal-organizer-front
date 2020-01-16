import {createStore} from 'redux';
import coreReducer, {habitReducer} from 'reducers';

export const globalStore = createStore(
    coreReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


export const habitStore = createStore(
    habitReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default globalStore;