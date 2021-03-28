import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  measurements: [],
  users: [],
  modals: {
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
        measurements: { selected: true }
      }
    }
  },
  sidebar: {
    collapsed: true,
    selectedTabId: "user-measurements-history-tab"
  }
}

export default createStore(reducers, defaultStoreValue);
