import {
  SET_MEASUREMENTS,
  ADD_MEASUREMENT,
  UPDATE_MEASUREMENT,
  REMOVE_MEASUREMENT
} from "../actionTypes/measurements";

export const setMeasurements = (measurements) => ({
  type: SET_MEASUREMENTS,
  measurements
})

export const addMeasurement = ({ attributes: { id, latitude, longitude, value, comment, user_id } }) => ({
  type: ADD_MEASUREMENT,
  id, latitude, longitude, value, comment, userId: user_id
})

export const updateMeasurement = ({ id, latitude, longitude, value, comment }) => ({
  type: UPDATE_MEASUREMENT,
  id, latitude, longitude, value, comment
})

export const removeMeasurement = ({ id }) => ({
  type: REMOVE_MEASUREMENT,
  id
})
