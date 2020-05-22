// modals tree structure:

// modals: {
//   geoPointCreation: {
//    show: showModal,
//     latitude: clickedLatitude,
//     longitude: clickedLongitude
//   },
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
    case SHOW_GEO_POINT_CREATION_MODAL:
      return { ...state, geoPointCreation: { show: true, latitude, longitude } };
    case HIDE_GEO_POINT_CREATION_MODAL:
      return { ...state, geoPointCreation: { show: false } };
    case SHOW_ABOUT_MODAL:
      return { ...state, about: { show: true } };
    case HIDE_ABOUT_MODAL:
      return { ...state, about: { show: false } };
    default:
      return state;
  }
}

export default modals;
