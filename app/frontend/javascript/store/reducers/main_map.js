// MainMap tree structure:
//
// mainMap: {
//   block: {
//     state: boolean,
//     blockMessage: stringAtLoader
//   }
// }
//

import {
  SET_MAIN_MAP_BLOCK
} from "../actionTypes/main_map";

function mainMap(state = {}, action) {
  const { type: actionType, block } = action;

  switch(actionType) {
    case SET_MAIN_MAP_BLOCK:
      return { ...state, block };
    default:
      return state;
  }
}

export default mainMap;
