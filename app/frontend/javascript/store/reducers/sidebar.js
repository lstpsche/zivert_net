// Sidebar tree structure:
//
// sidebar: {
//   collapsed: collapsedBool,
//   selectedTabId: selectedTabIdString,
//   data: {
//     cluster: clusterObject,
//     clusterMeasurements: arrayOfIds
//   }
// }
//

import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_SIDEBAR_STATE,
  SET_SIDEBAR_CLUSTER,
  SET_SIDEBAR_CLUSTER_MEASUREMENTS,
  CLEAR_SIDEBAR_DATA
} from "../actionTypes/sidebar";

const defaultDataState = Object.freeze({
  cluster: undefined,
  clusterMeasurements: []
});

function sidebar(state = {}, action) {
  const { type: actionType, collapsed, selectedTabId, cluster, clusterMeasurementsIds } = action;

  switch(actionType) {
    case SHOW_SIDEBAR:
      return { ...state, collapsed, selectedTabId };

    case HIDE_SIDEBAR:
      return { ...state, collapsed };

    case SET_SIDEBAR_STATE:
      return { ...state, collapsed, selectedTabId };

    case SET_SIDEBAR_CLUSTER:
      return { ...state, data: { ...state.data, cluster: cluster } };

    case SET_SIDEBAR_CLUSTER_MEASUREMENTS:
      return { ...state, data: { ...state.data, clusterMeasurements: clusterMeasurementsIds } };

    case CLEAR_SIDEBAR_DATA:
      return { ...state, data: defaultDataState }

    default:
      return state;
  }
}

export default sidebar;
