import { render } from "@testing-library/react";
import Screen from "./index";
import { store } from "../../store/index";
import {
  updateEnteredPin,
  updateIsOpened,
  updateScreenActive,
} from "../../store/safeSlice";
import { Provider } from "react-redux";

describe(Screen, () => {
  it("should show indicate safe is locked", () => {
    store.dispatch(updateEnteredPin("123456"));
    store.dispatch(updateIsOpened(false));
    store.dispatch(updateScreenActive(false));
    const { getByTestId } = render(
      <Provider store={store}>
        <Screen />
      </Provider>
    );
    expect(
      getByTestId("background").classList.contains("inactive-screen")
    ).toBe(true);
    expect(getByTestId("status").textContent).toEqual("Locked");
    expect(getByTestId("pin").textContent).toEqual("123456");
  });
});
