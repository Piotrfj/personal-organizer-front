import {combineReducers} from "redux";
import habitReducer from "./habitReducer";

export default combineReducers({
  habits: habitReducer
});