import { combineReducers } from "redux";
import measurements from "./measurements";
import modals from "./modals";
import currentUser from "./current_user";
import users from "./users";
import blocking from "./blocking";
import mainMap from "./main_map";
import sidebar from "./sidebar";

export default combineReducers({
  measurements,
  modals,
  currentUser,
  users,
  blocking,
  mainMap,
  sidebar
});
