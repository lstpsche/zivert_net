import { combineReducers } from "redux";
import measurements from "./measurements";
import staticMeasurements from "./static_measurements";
import modals from "./modals";
import currentUser from "./current_user";
import users from "./users";
import blocking from "./blocking";
import mainMap from "./main_map";
import sidebar from "./sidebar";
import userActions from "./user_actions";
import measurementsInPeriod from "./measurements_in_period";
import measurementsDiff from "./measurements_diff";
import weatherData from "./weather_data";

export default combineReducers({
  measurements,
  staticMeasurements,
  measurementsInPeriod,
  measurementsDiff,
  weatherData,
  modals,
  currentUser,
  users,
  blocking,
  mainMap,
  sidebar,
  userActions
});
