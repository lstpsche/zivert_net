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
  const { type: actionType, firstName, lastName, username, signedIn } = action;

  switch(actionType) {
    case SET_CURRENT_USER:
      return { firstName, lastName, username, signedIn };
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default currentUser;
