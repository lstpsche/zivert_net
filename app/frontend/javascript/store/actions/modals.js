import {
  SHOW_GEO_POINT_CREATION_MODAL,
  HIDE_GEO_POINT_CREATION_MODAL,
  SHOW_ABOUT_MODAL,
  HIDE_ABOUT_MODAL
} from "../actionTypes/modals";

export const showGeoPointCreationModal = ({ latitude, longitude }) => ({
  type: SHOW_GEO_POINT_CREATION_MODAL,
  latitude, longitude
})

export const hideGeoPointCreationModal = () => ({
  type: HIDE_GEO_POINT_CREATION_MODAL
})

export const showAboutModal = () => ({
  type: SHOW_ABOUT_MODAL
})

export const hideAboutModal = () => ({
  type: HIDE_ABOUT_MODAL
})
