import { render } from "react-dom";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";
import FullPageLoader from "../javascript/components/full_page_loader";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <ActionCableProvider url="/cable">
      <Provider store={store}>
        <FullPageLoader />
        <App />
      </Provider>
    </ActionCableProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
