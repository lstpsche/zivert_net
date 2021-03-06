import { combineReducers } from "redux";
import measurements from "./measurements";
import modals from "./modals";
import currentUser from "./current_user";
import users from "./users";
import blocking from "./blocking";
import mainMap from "./main_map";
import sidebar from "./sidebar";
import userActions from "./user_actions";
import measurementsInPeriod from "./measurements_in_period";

export default combineReducers({
  measurements,
  measurementsInPeriod,
  modals,
  currentUser,
  users,
  blocking,
  mainMap,
  sidebar,
  userActions
});
