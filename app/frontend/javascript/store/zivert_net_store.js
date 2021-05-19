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
    },
    settings: {
      id: undefined,
      user_id: undefined,
      units: "urh"
    },
    settingsOptions: {
      units: []
    },
    ref: undefined
  },
  sidebar: {
    collapsed: true,
    selectedTabId: "",
    data: {
      cluster: undefined,
      clusterMeasurements: []
    }
  },
  userActions: {
    measurementCreation: {
      state: false,
      data: {
        value: "",
        latitude: "",
        longitude: ""
      }
    }
  }
}

export default createStore(reducers, defaultStoreValue);
