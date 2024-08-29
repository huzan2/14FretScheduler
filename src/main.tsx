import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import AppRouter from "@router/AppRouter.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </StrictMode>
);
