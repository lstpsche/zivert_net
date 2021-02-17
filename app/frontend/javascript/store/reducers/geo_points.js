// GeoPoints tree structure:
//
// geoPoints: [
//   {
//     id: geoPointId,
//     longitude: geoPointWidth,
//     latitude: geoPointHeight,
//     radValue: geoPointRadValue,
//     selected: geoPointSelectedBool,
//     measurements: [measurementId1, measurementId2, ...]
//   },
//   ...
// ]
//

import {
  SET_GEO_POINTS,
  ADD_GEO_POINT,
  UPDATE_GEO_POINT,
  ADD_MEASUREMENT_TO_GEO_POINT,
  REMOVE_GEO_POINT,
  SELECT_GEO_POINT,
  UNSELECT_GEO_POINTS
} from "../actionTypes/geo_points";

function geoPoints(state = [], action) {
  const { type: actionType, id, userId, longitude, latitude, radValue, measurements, measurementId } = action;

  switch(actionType) {
    case SET_GEO_POINTS:
      return action.geoPoints.map(({ data: { attributes: { id, user_id: userId, longitude, latitude, rad_value: radValue}, relationships } }) => {
        const measurements = relationships.measurements.data.map(m => m.id);

        return { id, userId, longitude, latitude, radValue, measurements };
      });

    case ADD_GEO_POINT:
      return [
        ...state,
        { id, userId, longitude, latitude, radValue, measurements }
      ];

    case UPDATE_GEO_POINT:
      return state.map(geoPoint =>
        geoPoint.id === id ? { ...geoPoint, longitude, latitude, radValue } : geoPoint
      );

    case ADD_MEASUREMENT_TO_GEO_POINT:
      return state.map(geoPoint => {
        if (geoPoint.id !== id)
          return geoPoint;
        return { ...geoPoint, measurements: [ ...geoPoint.measurements, measurementId ] };
      });

    case REMOVE_GEO_POINT:
      return state.filter(({ id: geoPointId }) => geoPointId !== parseInt(id));

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
