import {
  SET_GEO_POINTS,
  ADD_GEO_POINT,
  UPDATE_GEO_POINT,
  REMOVE_GEO_POINT,
} from "../actionTypes/geo_points";

export const setGeoPoints = (geo_points) => ({
  type: SET_GEO_POINTS,
  geo_points
})

export const addGeoPoint = ({ id, width, height, rad_value }) => ({
  type: ADD_GEO_POINT,
  id, width, height, rad_value
})

export const updateGeoPoint = ({ id, width, height, rad_value }) => ({
  type: UPDATE_GEO_POINT,
  id, width, height, rad_value
})

export const removeGeoPoint = ({ id }) => ({
  type: REMOVE_GEO_POINT,
  id
})
