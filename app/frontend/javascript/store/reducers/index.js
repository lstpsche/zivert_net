import { combineReducers } from "redux";
import geoPoints from "./geo_points";
import geoPointCreationModal from "./geo_point_creation_modal";
import currentUser from "./current_user";
import blocking from "./blocking";
import mainMap from "./main_map";

export default combineReducers({
  geoPoints,
  geoPointCreationModal,
  currentUser,
  blocking,
  mainMap
});
