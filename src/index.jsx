import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import "tachyons";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
