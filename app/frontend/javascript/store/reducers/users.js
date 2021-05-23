// Users tree structure:
//
// users: [
//   {
//     id: userId,
//     firstName: userFirstName,
//     lastName: userLastName,
//     username: userUsername,
//     nickname: userNickname,
//     admin: userAdminBool
//   }
// ]
//

import {
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER
} from "../actionTypes/users";

function users(state = [], action) {
  const { type: actionType, id, firstName, lastName, username, nickname } = action;

  switch(actionType) {
    case SET_USERS:
      return action.users;

    case ADD_USER:
      return [
        ...state,
        { id, firstName, lastName, username, nickname }
      ];

    case UPDATE_USER:
      return state.map(user =>
        user.id === id ? { ...user, firstName, lastName, username, nickname } : user
      );

    case REMOVE_USER:
      return state.filter(({ id: userId }) => userId !== parseInt(id));

    default:
      return state;
  }
}

export default users;
