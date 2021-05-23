// MeasurementsInPeriod tree structure:
//
// measurementsInPeriod: [
//   {
//     id: measurementId,
//     latitude: latitudeValue,
//     longitude: longitudeValue,
//     value_urh: measurementValueUrh,
//     value_ush: measurementValueUsh,
//     userId: measurementUserId
//   },
//   ...
// ]
//

import { SET_MEASUREMENTS_IN_PERIOD } from "../actionTypes/measurements_in_period";

function measurementsInPeriod(state = [], action) {
  const { type: actionType, measurementsInPeriod } = action;

  switch(actionType) {
    case SET_MEASUREMENTS_IN_PERIOD:
      return measurementsInPeriod;

    default:
      return state;
  }
}

export default measurementsInPeriod;
