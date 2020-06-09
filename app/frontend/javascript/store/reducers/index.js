import { combineReducers } from "redux";
import geoPoints from "./geo_points";
import modals from "./modals";
import currentUser from "./current_user";
import blocking from "./blocking";
import mainMap from "./main_map";
import sidebar from "./sidebar";

export default combineReducers({
  geoPoints,
  modals,
  currentUser,
  blocking,
  mainMap,
  sidebar
});
