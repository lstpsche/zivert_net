// Measurements tree structure:
//
// measurements: [
//   {
//     id: measurementId,
//     user_id: measurementUserId,
//     geo_point_id: measurementGeoPointId,
//     value: measurementValue
//   },
//   ...
// ]
//

import {
  SET_MEASUREMENTS
} from "../actionTypes/measurements";

function measurements(state = [], action) {
  const { type: actionType } = action;

  switch(actionType)  {
    case SET_MEASUREMENTS:
      return action.measurements;
    default:
      return state;
  }
}

export default measurements;
