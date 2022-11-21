import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
