// Sidebar tree structure:
//
// sidebar: {
//   collapsed: collapsedBool,
//   selectedTabId: selectedTabIdString
// }
//

import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_SIDEBAR_STATE
} from "../actionTypes/sidebar";

function sidebar(state = {}, action) {
  const { type: actionType, collapsed, selectedTabId } = action;

  switch(actionType) {
    case SHOW_SIDEBAR:
      return { ...state, collapsed, selectedTabId };

    case HIDE_SIDEBAR:
      return { ...state, collapsed };

    case SET_SIDEBAR_STATE:
      return { ...state, collapsed, selectedTabId };

    default:
      return state;
  }
}

export default sidebar;
