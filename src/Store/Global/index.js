import { combineReducers } from "redux";
import loadingReducer from "./loading";

const globalReducers = combineReducers({
  loading: loadingReducer
});

export default globalReducers;