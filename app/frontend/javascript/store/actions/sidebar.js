import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_SIDEBAR_STATE,
  SET_SIDEBAR_CLUSTER,
  SET_SIDEBAR_CLUSTER_MEASUREMENTS,
  CLEAR_SIDEBAR_DATA
} from "../actionTypes/sidebar";

export const showSidebar = ({ selectedTabId = "user-measurements-history-tab" }) => ({
  type: SHOW_SIDEBAR,
  collapsed: false, selectedTabId
});

export const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
  collapsed: true
});

export const setSidebarState = ({ state, selectedTabId = "user-measurements-history-tab" }) => ({
  type: SET_SIDEBAR_STATE,
  collapsed: state === false, selectedTabId
});

export const setSidebarCluster = (cluster) => ({
  type: SET_SIDEBAR_CLUSTER,
  cluster
});

export const setSidebarClusterMeasurements = (clusterMeasurementsIds) => ({
  type: SET_SIDEBAR_CLUSTER_MEASUREMENTS,
  clusterMeasurementsIds
});

export const clearSidebarData = () => ({
  type: CLEAR_SIDEBAR_DATA
});
