// GeoPointCreationModals tree structure:

// geoPointCreationModals: {
//   show: showModal,
//   latitude: clickedLatitude,
//   longitude: clickedLongitude
// }
//

import {
  SHOW_GEO_POINT_CREATION_MODAL,
  HIDE_GEO_POINT_CREATION_MODAL
} from "../actionTypes/geo_point_creation_modal";

function geoPointCreationModals(state = [], action) {
  const { type: actionType, latitude, longitude } = action;

  switch(actionType) {
    case SHOW_GEO_POINT_CREATION_MODAL:
      return { show: true, latitude, longitude };
    case HIDE_GEO_POINT_CREATION_MODAL:
      return { show: false };
    default:
      return state;
  }
}

export default geoPointCreationModals;
