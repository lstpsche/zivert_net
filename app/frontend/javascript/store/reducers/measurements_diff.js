import { SET_MEASUREMENTS_DIFF } from "../actionTypes/measurements_diff";

function measurementsDiff(state = [], action) {
  const { type: actionType, measurementsDiff } = action;

  switch(actionType) {
    case SET_MEASUREMENTS_DIFF:
      return measurementsDiff;

    default:
      return state;
  }
}

export default measurementsDiff;
