import {
  SET_FULL_PAGE_BLOCK
} from "../actionTypes/blocking";

function blocking(state = {}, action) {
  const { type: actionType, fullPage, blockMessage } = action;

  switch(actionType) {
    case SET_FULL_PAGE_BLOCK:
      return { fullPage, blockMessage };

    default:
      return state;
  }
}

export default blocking;
