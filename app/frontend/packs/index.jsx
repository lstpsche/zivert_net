import { render } from "react-dom";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";
import FullPageLoader from "../javascript/components/full_page_loader";
import CurrentUserDataLoader from "../javascript/components/data_loaders/current_user_data_loader";
import UsersDataLoader from "../javascript/components/data_loaders/users_data_loader";
import MeasurementsDataLoader from "../javascript/components/data_loaders/measurements_data_loader";
import StaticMeasurementsDataLoader from "../javascript/components/data_loaders/static_measurements_data_loader";
import MapSettingsDataLoader from "../javascript/components/data_loaders/map_settings_data_loader";
import MeasurementsChannel from "../javascript/components/channels/measurements_channel";
import UsersChannel from "../javascript/components/channels/users_channel";
import MeasurementsInTimePeriodBGUpdater from "../javascript/components/bg_updaters/measurements_in_time_period_bg_updater";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <ActionCableProvider url="/cable">
      <Provider store={store}>
        <FullPageLoader />

        <CurrentUserDataLoader />
        <UsersDataLoader />
        <MeasurementsDataLoader />
        <StaticMeasurementsDataLoader />
        <MapSettingsDataLoader />

        <UsersChannel />
        <MeasurementsChannel />

        <MeasurementsInTimePeriodBGUpdater />

        <App />
      </Provider>
    </ActionCableProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
