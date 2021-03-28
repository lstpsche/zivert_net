// modals tree structure:

// modals: {
//   about: {
//     show: showModal
//   }
// }
//

import {
  SHOW_GEO_POINT_CREATION_MODAL,
  HIDE_GEO_POINT_CREATION_MODAL,
  SHOW_ABOUT_MODAL,
  HIDE_ABOUT_MODAL
} from "../actionTypes/modals";

function modals(state = {}, action) {
  const { type: actionType, latitude, longitude } = action;

  switch(actionType) {
    case SHOW_ABOUT_MODAL:
      return { ...state, about: { show: true } };

    case HIDE_ABOUT_MODAL:
      return { ...state, about: { show: false } };

    default:
      return state;
  }
}

export default modals;
