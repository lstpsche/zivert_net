import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: [],
  geoPointCreationModals: { show: false },
  currentUser: { signedIn: undefined },
  blocking: { fullPage: true },
  mainMap: {
    block: { state: false, blockMessage: undefined }
  }
}

export default createStore(reducers, defaultStoreValue);
