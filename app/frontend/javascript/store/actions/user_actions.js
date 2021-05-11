import {
  ENABLE_MEASUREMENT_CREATION,
  DISABLE_MEASUREMENT_CREATION,
  SET_MEASUREMENT_CREATION_DATA
} from "../actionTypes/user_actions";

export const enableMeasurementCreation = () => ({
  type: ENABLE_MEASUREMENT_CREATION
});

export const disableMeasurementCreation = () => ({
  type: DISABLE_MEASUREMENT_CREATION
});

export const setMeasurementCreationData = ({ value, latitude, longitude }) => ({
  type: SET_MEASUREMENT_CREATION_DATA,
  value, latitude, longitude
});
