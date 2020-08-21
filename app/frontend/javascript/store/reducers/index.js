import { combineReducers } from "redux";
import geoPoints from "./geo_points";
import measurements from "./measurements";
import modals from "./modals";
import currentUser from "./current_user";
import users from "./users";
import blocking from "./blocking";
import mainMap from "./main_map";
import sidebar from "./sidebar";

export default combineReducers({
  geoPoints,
  measurements,
  modals,
  currentUser,
  users,
  blocking,
  mainMap,
  sidebar
});
