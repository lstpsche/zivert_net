import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: [],
  measurements: [],
  users: [],
  modals: {
    geoPointCreation: { show: false },
    about: { show: false }
  },
  currentUser: { signedIn: undefined, admin: false },
  blocking: { fullPage: { state: true, blockMessage: undefined } },
  mainMap: {
    block: { state: false, blockMessage: undefined },
    layers: {
      base: {
        regularMap: { selected: true }
      },
      overlays: {
        dimmer: { selected: false },
        geoPoints: { selected: true }
      }
    }
  },
  sidebar: {
    collapsed: true,
    selectedTabId: "user-measurements-history-tab"
  }
}

export default createStore(reducers, defaultStoreValue);
