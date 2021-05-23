// userActions tree structure:
//
// userActions: {
//   measurementCreation: {
//     state: stateBool,
//     data: {
//       value: string
//       latitude: string,
//       longitude: string
//     }
//   }
// }
//

import {
  ENABLE_MEASUREMENT_CREATION,
  DISABLE_MEASUREMENT_CREATION,
  SET_MEASUREMENT_CREATION_DATA,
  SET_MEASUREMENT_CREATION_COORDINATES
} from "../actionTypes/user_actions";

function userActions(state = {}, action) {
  const { type: actionType, value, latitude, longitude } = action;

  switch(actionType) {
    case ENABLE_MEASUREMENT_CREATION:
      return { ...state, measurementCreation: { ...state.measurementCreation, state: true } };

    case DISABLE_MEASUREMENT_CREATION:
      return { ...state, measurementCreation: { ...state.measurementCreation, state: false } };

    case SET_MEASUREMENT_CREATION_DATA:
      return {
        ...state,
        measurementCreation: {
          ...state.measurementCreation,
          data: {
            ...state.measurementCreation.data,
            value, latitude, longitude
          }
        }
      };

    case SET_MEASUREMENT_CREATION_COORDINATES:
      return {
        ...state,
        measurementCreation: {
          ...state.measurementCreation,
          data: {
            ...state.measurementCreation.data,
            latitude, longitude
          }
        }
      };

    default:
      return state;
  }
}

export default userActions;
