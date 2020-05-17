import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: [],
  geoPointCreationModals: { show: false }
}

export default createStore(reducers, defaultStoreValue);
