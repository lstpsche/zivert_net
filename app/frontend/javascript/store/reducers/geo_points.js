// GeoPoints tree structure:
//
// geoPoints: [
//   {
//     id: geoPointsId,
//     width: geoPointsWidth,
//     height: geoPointsHeight,
//     radValue: geoPointsRadValue
//   },
//   ...
// ]

import {
  SET_GEO_POINTS,
  ADD_GEO_POINT,
  UPDATE_GEO_POINT,
  REMOVE_GEO_POINT
} from "../actionTypes/geo_points";

function geoPoints(state = [], action) {
  const { type: actionType, id, width, height, radValue } = action;

  switch(actionType) {
    case SET_GEO_POINTS:
      return action.geoPoints
    case ADD_GEO_POINT:
      return [
        ...state,
        { id, width, height, radValue }
      ]
    case UPDATE_GEO_POINT:
      return state.map (geoPoint =>
        geoPoint.id === id ? { ...geoPoint, width, height, radValue } : geo_point
      )
    case REMOVE_GEO_POINT:
      return state.filter(({ id: geoPointId }) => geoPointId !== id)
    default:
      return state
  }
}

export default geoPoints;
