import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        style={{ marginTop: "40px" }}
        toastStyle={{
          fontSize: "14px",
          padding: "2px 8px",
          lineHeight: "42px",
          minHeight: "20px",
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
