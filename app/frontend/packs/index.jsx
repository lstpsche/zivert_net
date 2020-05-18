import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../javascript/store/zivert_net_store";
import App from "../javascript/components/app";

document.addEventListener("DOMContentLoaded", () => {
  render (
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
