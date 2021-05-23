import {
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER
} from "../actionTypes/users";

export const setUsers = (users) => ({
  type: SET_USERS,
  users
})

export const addUser = ({ attributes: { id, first_name, last_name, username, nickname } }) => {
  return {
    type: ADD_USER,
    id, firstName: first_name, lastName: last_name, username, nickname
  }
}

export const updateUser = ({ attributes: { id, first_name, last_name, username, nickname } }) => {
  return {
    type: UPDATE_USER,
    id, firstName: first_name, lastName: last_name, username, nickname
  }
}

export const removeUser = ({ attributes: { id } }) => {
  return {
    type: REMOVE_USER,
    id
  }
}
