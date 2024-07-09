import { useState } from "react";
//import ClickTracker from "../ClickTracker/ClickTracker";
import Timer from "../Timer/Timer";
import ClickTracker from "../ClickTracker/ClickTracker";
import css from "./App.module.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.container}>
      <h1>Effects in React</h1>
      <button onClick={toggle}>{isOpen ? "Unmount" : "Mount"}</button>
      {isOpen && <Timer />}
      <ClickTracker />
    </div>
  );
}
