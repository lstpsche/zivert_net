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

export const addMeasurement = ({ attributes: { id, latitude, longitude, value_urh, value_ush, user_id, created_at } }) => ({
  type: ADD_MEASUREMENT,
  id, latitude, longitude, value_urh, value_ush, userId: user_id, createdAt: created_at
})

export const updateMeasurement = ({ id, latitude, longitude, value_urh, value_ush }) => ({
  type: UPDATE_MEASUREMENT,
  id, latitude, longitude, value_urh, value_ush
})

export const removeMeasurement = ({ id }) => ({
  type: REMOVE_MEASUREMENT,
  id
})
