import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

document.getElementById("splash-screen")?.remove();

// Failsafe: force-hide the splash screen after 30s in case mounting hangs.
setTimeout(() => {
  document.getElementById("splash-screen")?.remove();
}, 30000);
