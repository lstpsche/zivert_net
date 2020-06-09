import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: [],
  modals: {
    geoPointCreation: { show: false },
    about: { show: false }
  },
  currentUser: { signedIn: undefined, admin: false },
  blocking: { fullPage: true },
  mainMap: {
    block: { state: false, blockMessage: undefined }
  },
  sidebar: {
    collapsed: true,
    selectedTabId: "user-measurements-history-tab"
  }
}

export default createStore(reducers, defaultStoreValue);
