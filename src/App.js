import "./App.scss";
import Button from "./components/Button";
import { keys } from "./components/data";
import Screen from "./components/Screen";

const App = () => {
  return (
    <div className="safe-container">
      <div className="safe-panel">
        <Screen />
        <div className="keyboard-container">
          {keys.map((item, idx) => (
            <Button value={item} key={idx.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
