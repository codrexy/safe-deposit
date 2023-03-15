import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCopyPin,
  updateEnteredPin,
  updateIsOpened,
  updateSavedPin,
  updateScreenActive,
  updateStatus,
} from "../../store/safeSlice";
import "./button.scss";

const Button = ({ value, setSubmitCountDown, setScreenCountDown }) => {
  const { entered_pin, isOpened } = useSelector((state) => state.safe);
  const dispatch = useDispatch();

  const updateText = (value) => {
    setSubmitCountDown(1.2);
    setScreenCountDown(5);
    if (value !== "L") {
      dispatch(updateScreenActive(true));
      const arr = entered_pin.split("");
      arr.push(value);
      const newCombo = arr.join("");
      dispatch(updateEnteredPin(newCombo));
      dispatch(updateCopyPin(newCombo));
    } else {
      if (isOpened) {
        if (entered_pin.length >= 4) {
          dispatch(updateStatus("Locking..."));
          const interval = setTimeout(() => {
            dispatch(updateSavedPin(entered_pin));
            dispatch(updateIsOpened(false));
            dispatch(updateStatus(""));
            dispatch(updateEnteredPin(""));
            dispatch(updateCopyPin(""));
            clearTimeout(interval);
          }, 3000);
        } else {
          alert("Combination should be at least 4 characters.");
        }
      }
    }
  };

  return (
    <button
      data-testid="pin"
      className="button"
      onClick={() => updateText(value)}
    >
      {value}
    </button>
  );
};

export default Button;
