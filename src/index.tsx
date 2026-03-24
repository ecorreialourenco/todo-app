import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./pages/App";
import { AuthProvider } from "./hooks/useAuth";
import "./css/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
