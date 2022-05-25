import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "../actionTypes/current_user";

export const setCurrentUser = ({ id, signed_in, first_name, last_name, username, nickname, admin }) => ({
  type: SET_CURRENT_USER,
  id, firstName: first_name, lastName: last_name, username, nickname, signedIn: signed_in, admin
})

export const updateCurrentUser = ({ firstName, lastName, username, nickname }) => ({
  type: UPDATE_CURRENT_USER,
  firstName, lastName, username, nickname
})

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
})
