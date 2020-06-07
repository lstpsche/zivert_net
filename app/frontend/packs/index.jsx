import { render } from "react-dom";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";
import FullPageLoader from "../javascript/components/full_page_loader";
import CurrentUserDataLoader from "../javascript/components/data_loaders/current_user_data_loader";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <ActionCableProvider url="/cable">
      <Provider store={store}>
        <FullPageLoader />
        <CurrentUserDataLoader />
        <App />
      </Provider>
    </ActionCableProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
