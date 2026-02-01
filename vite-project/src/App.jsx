import { createContext, useState } from "react";
import "./App.css";
import ReactLink from "./ReactLink";
import ReactRoute from "./ReactRoute";

export let GlabalVariableContex = createContext();

function App() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <GlabalVariableContex.Provider
        value={{ token: token, setToken: setToken }}
      >
        <ReactLink />
        <ReactRoute />
      </GlabalVariableContex.Provider>
    </>
  );
}

export default App;
