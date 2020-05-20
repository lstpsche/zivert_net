import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "../actionTypes/current_user";

export const setCurrentUser = ({ signed_in, first_name, last_name, username }) => ({
  type: SET_CURRENT_USER,
  firstName: first_name, lastName: last_name, username, signedIn: signed_in
})


export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
})
