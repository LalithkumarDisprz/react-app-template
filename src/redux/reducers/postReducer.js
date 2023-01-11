import { ADD_POST } from "../actions";

const initialState = {
  getValue: false,
};
function postreducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        getValue: !state.getValue,
      };
    default:
      return state;
  }
}
export default postreducer;
