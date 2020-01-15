import {createStore} from 'redux';
import habitsApp from 'reducers';

const store = createStore(
    habitsApp /* preloadedState, */,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


export default store;