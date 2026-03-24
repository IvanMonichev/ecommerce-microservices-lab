import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/index.css";

const redirect = new URLSearchParams(window.location.search).get("redirect");

if (redirect) {
  window.history.replaceState(
    null,
    "",
    `${import.meta.env.BASE_URL}${redirect.replace(/^\//, "")}`,
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
