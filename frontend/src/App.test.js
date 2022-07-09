import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

test("renders the App component", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
