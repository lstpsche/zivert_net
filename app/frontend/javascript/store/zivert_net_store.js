import { createStore } from "redux";
import reducers from "./reducers/index";

const defaultStoreValue = {
  geoPoints: []
}

export default createStore(reducers, defaultStoreValue);
