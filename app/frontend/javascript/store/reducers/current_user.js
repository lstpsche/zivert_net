// currentUser tree structure:
//
// currentUser: {
//   firstName: userFirstName,
//   lastName: userLastName,
//   username: userUsername,
//   signedIn: isUserSignedIn
// }
//

import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "../actionTypes/current_user";

function currentUser(state = { signedIn: undefined }, action) {
  const { type: actionType, id, firstName, lastName, username, nickname, signedIn, admin } = action;

  switch(actionType) {
    case SET_CURRENT_USER:
      return { id, firstName, lastName, username, nickname, signedIn, admin };
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default currentUser;
