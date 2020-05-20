import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";
import FullPageLoader from "../javascript/components/full_page_loader";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <Provider store={store}>
      <FullPageLoader />
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
