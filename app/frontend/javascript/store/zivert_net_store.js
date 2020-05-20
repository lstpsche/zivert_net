import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: [],
  geoPointCreationModals: { show: false },
  currentUser: { signedIn: undefined },
  blocking: { fullPage: true }
}

export default createStore(reducers, defaultStoreValue);
