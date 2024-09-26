import { CHANGE_STATE, CLOSE_STATE } from "../actions";

const initialState = {
  displayAddEvents: false,
};
function addEventsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATE:
      return {
        displayAddEvents: !state.displayAddEvents,
      };
    default:
      return state;
  }
}
export default addEventsReducer;
