import {
  SET_STATIC_MEASUREMENTS,
  ADD_STATIC_MEASUREMENT,
  UPDATE_STATIC_MEASUREMENT,
  REMOVE_STATIC_MEASUREMENT
} from "../actionTypes/static_measurements";

export const setStaticMeasurements = (staticMeasurements) => ({
  type: SET_STATIC_MEASUREMENTS,
  staticMeasurements
})

export const addStaticMeasurement = ({ attributes: { id, latitude, longitude, value_urh, value_ush, is_static, station_name, user_id, created_at } }) => ({
  type: ADD_STATIC_MEASUREMENT,
  id, latitude, longitude, value_urh, value_ush, isStatic: is_static, stationName: station_name, userId: user_id, createdAt: created_at
})

// is_static and station_name should not be updated -- they are pre-set in db
export const updateStaticMeasurement = ({ id, latitude, longitude, value_urh, value_ush }) => ({
  type: UPDATE_STATIC_MEASUREMENT,
  id, latitude, longitude, value_urh, value_ush
})

export const removeStaticMeasurement = ({ id }) => ({
  type: REMOVE_STATIC_MEASUREMENT,
  id
})
