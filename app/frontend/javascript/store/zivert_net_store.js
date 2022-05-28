import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  measurements: [],
  staticMeasurements: [],
  measurementsInPeriod: [],
  weatherData: [],
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
        heatmap: { selected: false },
        hexagons: { selected: false },
        measurements: { selected: true },
      },
      weatherOverlays: {
        none: { selected: true },
        temperature: { selected: false },
        wind: { selected: false },
        precipitation: { selected: false },
        clouds: { selected: false }
      }
    },
    settings: {
      id: undefined,
      user_id: undefined,
      units: "urh",
      measurementsPeriod: {
        startDate: new Date(new Date().setHours(0,0,0,0)),
        endDate: new Date(new Date().setHours(23,59,59,999))
      }
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

// will use deprecated createStore until they will finally remove it
// it's easier than rewriting the whole redux part
export default createStore(reducers, defaultStoreValue);
