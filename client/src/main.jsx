import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

if ('serviceWorker' in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    }, function (err) {
      console.log("Service Worker registration failed:", err);
    });
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
