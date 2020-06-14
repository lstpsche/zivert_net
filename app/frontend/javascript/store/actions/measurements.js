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

export const addMeasurement = ({ id, value, user_id, geo_point_id }) => ({
  type: ADD_MEASUREMENT,
  id, value, userId: user_id, geoPointId: geo_point_id
})

export const updateMeasurement = ({ id, value }) => ({
  type: UPDATE_MEASUREMENT,
  id, value
})

export const removeMeasurement = ({ id }) => ({
  type: REMOVE_MEASUREMENT,
  id
})
