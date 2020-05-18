import { combineReducers } from "redux";
import geoPoints from "./geo_points";
import geoPointCreationModals from "./geo_point_creation_modal";

export default combineReducers({
  geoPoints,
  geoPointCreationModals
});
