import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Button from "./components/Button";
import { keys } from "./components/data";
import Screen from "./components/Screen";
import {
  updateCopyPin,
  updateEnteredPin,
  updateIsOpened,
  updateSavedPin,
  updateScreenActive,
  updateStatus,
} from "./store/safeSlice";

const App = () => {
  const [screenCountDown, setScreenCountDown] = useState(0);
  const [submitCountDown, setSubmitCountDown] = useState(0);
  const { isOpened, status, saved_pin, copy_pin, serial_number } = useSelector(
    (state) => state.safe
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setTimeout(() => {
      if (screenCountDown > 0) {
        setScreenCountDown(screenCountDown - 1);
      } else {
        dispatch(updateScreenActive(false));
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenCountDown]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (submitCountDown > 0) {
        setSubmitCountDown(submitCountDown - 0.1);
      } else {
        dispatch(updateEnteredPin(""));
        if (status !== "Service") {
          validatePin();
        } else {
          requestSerialNumber();
        }
      }
    }, 100);

    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCountDown]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (submitCountDown > 0) {
        setSubmitCountDown(submitCountDown - 0.1);
      } else {
        dispatch(updateEnteredPin(""));
        if (status !== "Service") {
          validatePin();
        } else {
          requestSerialNumber();
        }
      }
    }, 100);

    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCountDown]);

  const validatePin = () => {
    if (!isOpened) {
      if (copy_pin === saved_pin) {
        dispatch(updateStatus("Unlocking..."));
        const interval = setTimeout(() => {
          dispatch(updateSavedPin(null));
          dispatch(updateIsOpened(true));
          dispatch(updateStatus("Ready"));
          dispatch(updateEnteredPin(""));
          dispatch(updateCopyPin(""));
          clearTimeout(interval);
        }, 3000);
      } else {
        if (copy_pin !== "000000") {
          dispatch(updateStatus("Error"));
        } else {
          dispatch(updateStatus("Service"));
        }
      }
    }
  };

  const requestSerialNumber = async () => {
    dispatch(updateStatus("Validating..."));
    try {
      const response = await fetch(
        `https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=${copy_pin}`
      );
      const data = await response.json();
      if (data?.sn.toString() === serial_number.toString()) {
        dispatch(updateStatus("Unlocking..."));
        const interval = setTimeout(() => {
          dispatch(updateSavedPin(null));
          dispatch(updateIsOpened(true));
          dispatch(updateStatus("Ready"));
          dispatch(updateEnteredPin(""));
          dispatch(updateCopyPin(""));
          clearTimeout(interval);
        }, 3000);
      } else {
        dispatch(updateStatus("Error"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="safe-container">
      <div className="safe-panel">
        <Screen />
        <div className="keyboard-container">
          {keys.map((item, idx) => (
            <Button
              value={item}
              setScreenCountDown={setScreenCountDown}
              setSubmitCountDown={setSubmitCountDown}
              key={idx}
            />
          ))}
        </div>
        <p className="serial-number">S/N: {serial_number}</p>
      </div>
    </div>
  );
};

export default App;
