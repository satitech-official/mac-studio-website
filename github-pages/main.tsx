import React from "react";
import { createRoot } from "react-dom/client";
import MacStudioSite from "../components/MacStudioSite";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MacStudioSite />
  </React.StrictMode>,
);
