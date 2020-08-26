import { render } from "react-dom";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";
import FullPageLoader from "../javascript/components/full_page_loader";
import CurrentUserDataLoader from "../javascript/components/data_loaders/current_user_data_loader";
import UsersDataLoader from "../javascript/components/data_loaders/users_data_loader";
import GeoPointsDataLoader from "../javascript/components/data_loaders/geo_points_data_loader";
import MeasurementsDataLoader from "../javascript/components/data_loaders/measurements_data_loader";
import GeoPointsChannel from "../javascript/components/channels/geo_points_channel";
import MeasurementsChannel from "../javascript/components/channels/measurements_channel";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <ActionCableProvider url="/cable">
      <Provider store={store}>
        <FullPageLoader />

        <CurrentUserDataLoader />
        <UsersDataLoader />
        <GeoPointsDataLoader />
        <MeasurementsDataLoader />

        <GeoPointsChannel />
        <MeasurementsChannel />

        <App />
      </Provider>
    </ActionCableProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
