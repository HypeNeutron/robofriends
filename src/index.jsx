import { createRoot } from "react-dom/client";
import React from "react";
import "tachyons";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.register();
