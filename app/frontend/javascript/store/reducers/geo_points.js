// GeoPoints tree structure:
//
// geoPoints: [
//   {
//     id: geoPointId,
//     longitude: geoPointWidth,
//     latitude: geoPointHeight,
//     radValue: geoPointRadValue,
//     comment: geoPointComment,
//     selected: geoPointSelectedBool
//   },
//   ...
// ]
//

import {
  SET_GEO_POINTS,
  ADD_GEO_POINT,
  UPDATE_GEO_POINT,
  REMOVE_GEO_POINT,
  SELECT_GEO_POINT,
  UNSELECT_GEO_POINTS
} from "../actionTypes/geo_points";

function geoPoints(state = [], action) {
  const { type: actionType, id, userId, longitude, latitude, radValue, comment } = action;

  switch(actionType) {
    case SET_GEO_POINTS:
      return action.geoPoints;
    case ADD_GEO_POINT:
      return [
        ...state,
        { id, userId, longitude, latitude, radValue, comment }
      ];
    case UPDATE_GEO_POINT:
      return state.map(geoPoint =>
        geoPoint.id === id ? { ...geoPoint, longitude, latitude, radValue, comment } : geo_point
      );
    case REMOVE_GEO_POINT:
      return state.filter(({ id: geoPointId }) => geoPointId !== id);
    case SELECT_GEO_POINT:
      return state.map(geoPoint =>
        geoPoint.id === id ? { ...geoPoint, selected: true } : { ...geoPoint, selected: false }
      );
    case UNSELECT_GEO_POINTS:
      return state.map(geoPoint => ({ ...geoPoint, selected: false }));
    default:
      return state;
  }
}

export default geoPoints;
