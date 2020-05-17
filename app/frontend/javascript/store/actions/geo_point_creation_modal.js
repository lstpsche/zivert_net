import {
  SHOW_GEO_POINT_CREATION_MODAL,
  HIDE_GEO_POINT_CREATION_MODAL
} from "../actionTypes/geo_point_creation_modal";

export const showGeoPointCreationModal = (latitude, longitude) => ({
  type: SHOW_GEO_POINT_CREATION_MODAL,
  latitude, longitude
})

export const hideGeoPointCreationModal = () => ({
  type: HIDE_GEO_POINT_CREATION_MODAL
})
