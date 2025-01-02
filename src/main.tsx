import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWebGL from "./AppWebGL.tsx";
import AppThree from "./AppThree.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AppWebGL /> */}
    <AppThree />
  </StrictMode>
);
