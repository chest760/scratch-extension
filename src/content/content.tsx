import React from "react";
import ReactDOM from "react-dom/client";
import { CodeSubmit } from "../component/button/CodeSubmit";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);




ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <CodeSubmit />
  </React.StrictMode>
);
