import React from "react";
import ReactDOM from "react-dom/client";
import { Context } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app/App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Context>
        <App />
      </Context>
    </Router>
  </React.StrictMode>
);
