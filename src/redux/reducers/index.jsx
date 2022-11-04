import { combineReducers } from "redux";
import AccountDataReducer from "./accountDataReducers";
import GetDataReducers from "./getDataReducers";
import SearchCarData from "./searchCarReducers";

export default combineReducers({
  getDataReducers: GetDataReducers,
  searchCarReducers: SearchCarData,
  accountDataReducers: AccountDataReducer,
});
