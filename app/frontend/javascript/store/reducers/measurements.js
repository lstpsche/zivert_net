// Measurements tree structure:
//
// measurements: [
//   {
//     id: measurementId,
//     latitude: latitudeValue,
//     longitude: longitudeValue,
//     value: measurementValue,
//     comment: measurementComment,
//     userId: measurementUserId
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
  const { type: actionType, id, latitude, longitude, value, comment, userId } = action;

  switch(actionType) {
    case SET_MEASUREMENTS:
      return action.measurements;

    case ADD_MEASUREMENT:
      return [
        ...state,
        { id, latitude, longitude, value, comment, userId }
      ];

    case UPDATE_MEASUREMENT:
      return state.map(measurement =>
        measurement.id === id ? { ...measurement, latitude, longitude, value, comment } : measurement
      );

    case REMOVE_MEASUREMENT:
      return state.filter(({ id: measurementId }) => measurementId !== parseInt(id))

    default:
      return state;
  }
}

export default measurements;
