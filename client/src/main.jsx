import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// main.jsx or index.jsx
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("SW registered"))
      .catch((err) => console.log("SW registration failed:", err));
  });
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </StrictMode>
  </BrowserRouter>
);
