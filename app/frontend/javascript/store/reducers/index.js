import { combineReducers } from "redux";
import geoPoints from "./geo_points";
import geoPointCreationModals from "./geo_point_creation_modal";
import currentUser from "./current_user";
import blocking from "./blocking";
import mainMap from "./main_map";

export default combineReducers({
  geoPoints,
  geoPointCreationModals,
  currentUser,
  blocking,
  mainMap
});
