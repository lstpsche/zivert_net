import {
  SET_GEO_POINTS,
  ADD_GEO_POINT,
  UPDATE_GEO_POINT,
  REMOVE_GEO_POINT,
} from "../actionTypes/geo_points";

export const setGeoPoints = (geoPoints) => ({
  type: SET_GEO_POINTS,
  geoPoints
})

export const addGeoPoint = ({ id, longitude, latitude, radValue }) => ({
  type: ADD_GEO_POINT,
  id, longitude, latitude, radValue
})

export const updateGeoPoint = ({ id, longitude, latitude, radValue }) => ({
  type: UPDATE_GEO_POINT,
  id, longitude, latitude, radValue
})

export const removeGeoPoint = ({ id }) => ({
  type: REMOVE_GEO_POINT,
  id
})
