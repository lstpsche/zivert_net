import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_SIDEBAR_STATE
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
