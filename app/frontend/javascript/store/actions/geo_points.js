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

export const addGeoPoint = ({ id, user_id, longitude, latitude, rad_value, comment }) => ({
  type: ADD_GEO_POINT,
  id, userId: user_id, longitude, latitude, radValue: rad_value, comment
})

export const updateGeoPoint = ({ id,  longitude, latitude, rad_value, comment }) => ({
  type: UPDATE_GEO_POINT,
  id, longitude, latitude, radValue: rad_value, comment
})

export const removeGeoPoint = ({ id }) => ({
  type: REMOVE_GEO_POINT,
  id
})
