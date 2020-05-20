import {
  SET_FULL_PAGE_BLOCK
} from "../actionTypes/blocking";

function blocking(state = {}, action) {
  const { type: actionType, fullPage } = action;

  switch(actionType) {
    case SET_FULL_PAGE_BLOCK:
      return { ...state, fullPage };
    default:
      return state;
  }
}

export default blocking;
