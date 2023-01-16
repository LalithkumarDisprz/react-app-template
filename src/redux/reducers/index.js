import { combineReducers } from "redux";
import addEventsReducer from "./displayAddEventsReducers";
import datereducer from "./dateReducer";
import getEventsReducer from "./getEventsReducer";
// import localDateStringReducer from "./convertToLocalDateReducer";
export default combineReducers({
  addEventsReducer,
  datereducer,
  getEventsReducer,
});
