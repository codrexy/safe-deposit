import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Button from "./index";

describe(Button, () => {
  it("Button renders with value inside them", () => {
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <Button
          value={"a"}
          setScreenCountDown={jest.fn()}
          setSubmitCountDown={jest.fn()}
        />
      </Provider>
    );
    expect(getByTestId("pin").textContent).toEqual("a");
    fireEvent.click(getByRole("button", { name: "a" }));
  });
});
