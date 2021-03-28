import {
  SHOW_ABOUT_MODAL,
  HIDE_ABOUT_MODAL
} from "../actionTypes/modals";

export const showAboutModal = () => ({
  type: SHOW_ABOUT_MODAL
})

export const hideAboutModal = () => ({
  type: HIDE_ABOUT_MODAL
})
