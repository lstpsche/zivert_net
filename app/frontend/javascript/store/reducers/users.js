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
  SET_USERS
} from "../actionTypes/users";

function users(state = [], action) {
  const { type: actionType } = action;

  switch(actionType) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}

export default users;
