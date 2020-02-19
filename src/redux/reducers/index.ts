import {combineReducers} from "redux";
import habitReducer from "./habitReducer";
import appReducer from './appReducer';

export default combineReducers({
  habits: habitReducer,
  app: appReducer,
});
