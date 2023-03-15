import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";

test("App renders", () => {
  //   const persistor = persistStore(store);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
