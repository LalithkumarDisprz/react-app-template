import { combineReducers } from "redux";
import addEventsReducer from "./displayAddEventsReducers";
import datereducer from "./dateReducer";
import getEventsReducer from "./getEventsReducer";
export default combineReducers({
  addEventsReducer,
  datereducer,
  getEventsReducer,
});
