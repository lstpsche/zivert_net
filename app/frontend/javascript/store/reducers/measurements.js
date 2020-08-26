// Measurements tree structure:
//
// measurements: [
//   {
//     id: measurementId,
//     value: measurementValue,
//     comment: measurementComment,
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
  const { type: actionType, id, value, comment, userId, geoPointId } = action;

  switch(actionType) {
    case SET_MEASUREMENTS:
      return action.measurements;
    case ADD_MEASUREMENT:
      return [
        ...state,
        { id, value, comment, userId, geoPointId }
      ];
    case UPDATE_MEASUREMENT:
      return state.map(measurement =>
        measurement.id === id ? { ...measurement, value, comment } : measurement
      );
    case REMOVE_MEASUREMENT:
      return state.filter(({ id: measurementId }) => measurementId !== parseInt(id))
    default:
      return state;
  }
}

export default measurements;
