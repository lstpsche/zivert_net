// Static Measurements tree structure:
//
// staticMeasurements: [
//   {
//     id: measurementId,
//     latitude: latitudeValue,
//     longitude: longitudeValue,
//     value_urh: measurementValueUrh,
//     value_ush: measurementValueUsh,
//     isStatic: true,
//     stationName: measurementStationName
//     userId: measurementUserId
//   },
//   ...
// ]
//

import {
  SET_STATIC_MEASUREMENTS,
  ADD_STATIC_MEASUREMENT,
  UPDATE_STATIC_MEASUREMENT,
  REMOVE_STATIC_MEASUREMENT
} from "../actionTypes/static_measurements";

function staticMeasurements(state = [], action) {
  const { type: actionType, staticMeasurements, id, latitude, longitude, value_urh, value_ush, isStatic, stationName, userId, createdAt } = action;

  switch(actionType) {
    case SET_STATIC_MEASUREMENTS:
      // let createdAts = staticMeasurements.map(m => Date.parse(m.createdAt)).sort()
      // let startDate = new Date(createdAts[0]);
      // let endDate = new Date(createdAts[createdAts.length - 1]);
      return staticMeasurements;

    case ADD_STATIC_MEASUREMENT:
      return [
        ...state,
        { id, latitude, longitude, value_urh, value_ush, isStatic, stationName, userId, createdAt }
      ];

    case UPDATE_STATIC_MEASUREMENT:
      return state.map(static_measurement =>
        static_measurement.id === id ? { ...static_measurement, latitude, longitude, value_urh, value_ush } : static_measurement
      );

    case REMOVE_STATIC_MEASUREMENT:
      return state.filter(({ id: static_measurementId }) => static_measurementId !== parseInt(id))

    default:
      return state;
  }
}

export default staticMeasurements;
