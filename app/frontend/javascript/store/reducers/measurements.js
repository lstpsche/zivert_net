// Measurements tree structure:
//
// measurements: [
//   {
//     id: measurementId,
//     value: measurementValue,
//     userId: measurementUserId,
//     geoPointId: measurementGeoPointId
//   },
//   ...
// ]
//

import {
  SET_MEASUREMENTS,
  ADD_MEASUREMENT,
  UPDATE_MEASUREMENT,
  REMOVE_MEASUREMENT
} from "../actionTypes/measurements";

function measurements(state = [], action) {
  const { type: actionType, id, value, userId, geoPointId } = action;

  switch(actionType) {
    case SET_MEASUREMENTS:
      return action.measurements;
    case ADD_MEASUREMENT:
      return [
        ...state,
        { id, value, userId, geoPointId }
      ];
    case UPDATE_MEASUREMENT:
      return state.map(measurement =>
        measurement.id === id ? { ...measurement, value } : measurement
      );
    case REMOVE_MEASUREMENT:
      return state.filter(({ id: measurementId }) => measurementId !== id)
    default:
      return state;
  }
}

export default measurements;
