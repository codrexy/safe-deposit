import React from "react";
import { useSelector } from "react-redux";
import "./screen.scss";

const Screen = () => {
  const { entered_pin, isOpened, screen_active, status } = useSelector(
    (state) => state.safe
  );
  return (
    <div
      className={`screen ${
        screen_active ? "active-screen" : "inactive-screen"
      }`}
      data-testid="background"
    >
      <p className="left" data-testid="status">
        {isOpened ? "Unlocked" : "Locked"}
      </p>
      <p className="right" data-testid="pin">
        {entered_pin.length > 0 ? entered_pin : status}
      </p>
    </div>
  );
};

export default Screen;
