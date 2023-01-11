import { combineReducers } from "redux";
import addEventsReducer from "./displayAddEventsReducers";
import datereducer from "./dateReducer";
import postreducer from "./postReducer";
// import localDateStringReducer from "./convertToLocalDateReducer";
export default combineReducers({
  addEventsReducer,
  datereducer,
  postreducer,
});
