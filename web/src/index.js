import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AccountContextProvider from "./contexts/AccountContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AccountContextProvider>
    <Router>  
      <App />
    </Router>
  </AccountContextProvider>
);
